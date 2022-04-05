import React, { useState, useEffect, useCallback, useRef } from 'react';
import Universe from './Universe';
import Sidebar from './Sidebar';
import Menu from './Menu';
import About from './About';
import axios, { AxiosResponse } from 'axios';
import produce from 'immer';
import IUniverse from '../Interfaces/IUniverse';

const numRows = 30;
const numCols = 50;
let initialState: number[][];
let initialized = false;

const reset = (): number[][] => {
  const uni = [];
  for (let i = 0; i < numRows; i++) {
    // create an empty universe; all cells are dead
    uni.push(Array.from(Array(numCols), () => 0));
  }
  return uni;
};

const App: React.FC = () => {
  const [stateName, setStateName] = useState('');
  const [generations, setGenerations] = useState(0);
  const [universe, setUniverse] = useState<number[][]>(reset); // current universe rendered to page
  const [presets, setPresets] = useState<IUniverse[]>([]);
  const [userSaves, setUserSaves] = useState<IUniverse[]>([]);
  const [isRunning, setAction] = useState(false);
  const runningRef = useRef(isRunning);
  runningRef.current = isRunning;

  useEffect(() => {
    getUniverses();
  }, []);

  const updateUniverse = () =>
    universe.map((row: number[], i: number) => {
      return row.map((cellStatus: number, j: number) => {
        return (
          <div
            className={cellStatus ? 'alive cell' : 'dead cell'}
            key={`${i}-${j}`}
            onClick={() => {
              setUniverse(
                produce(universe, (uniCopy: number[][]) => {
                  uniCopy[i][j] = cellStatus ? 0 : 1;
                })
              );
            }}
          ></div>
        );
      });
    });

  const getUniverses = () => {
    axios
      .get('/universes')
      .then((universes: AxiosResponse) => {
        let presets: IUniverse[] = [];
        let userSaves: IUniverse[] = [];
        universes.data.forEach((universe: IUniverse) => {
          universe.preset ? presets.push(universe) : userSaves.push(universe);
        });
        setUserSaves(userSaves);
        setPresets(presets);
      })
      .catch(console.error);
  };

  const handlePlayStop = () => {
    setAction(!isRunning); // toggle on/off
    if (!initialized) {
      initialized = true;
      initialState = universe;
    }
    if (!isRunning) {
      runningRef.current = true;
      runSimulation();
    }
  };

  const handleClear = () => {
    setGenerations(0);
    initialized = false;
    setAction(false);
    setUniverse((uni: number[][]) => produce(uni, reset));
    initialState = reset();
  };

  const handleNewUniverse = (preset: boolean, index: number) => {
    setAction(false);
    setUniverse((universe: number[][]) =>
      produce(universe, () =>
        preset ? presets[index].universe : userSaves[index].universe
      )
    );
    setGenerations(0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStateName(e.target.value);
  };

  const handleSave = () => {
    if (initialState) {
      axios
        .post('/universe', {
          name: stateName,
          preset: true,
          universe: initialState,
        })
        .then(() => getUniverses())
        .catch((e) => {
          console.error(e);
        });
    }
  };

  const handleReset = () => {
    if (!initialState) {
      return;
    }
    setGenerations(0);
    setAction(false);
    setUniverse((universe: number[][]) =>
      produce(universe, () => initialState)
    );
  };

  const getNextGeneration = (universe: number[][]) => {
    {
      return produce(universe, (nextUniverse: number[][]) => {
        // x and y represent a cell's coordinates in the universe
        for (let x = 0; x < numRows; x++) {
          for (let y = 0; y < numCols; y++) {
            let neighborsAlive = 0;

            for (let i = x - 1; i <= x + 1; i++) {
              for (let j = y - 1; j <= y + 1; j++) {
                if (
                  i >= 0 &&
                  j >= 0 &&
                  i < numRows &&
                  j < numCols &&
                  universe[i][j]
                ) {
                  if (i === x && j === y) {
                    // do nothing
                  } else {
                    neighborsAlive++;
                  }
                }
              }
            }

            // if a cell is alive...
            if (universe[x][y]) {
              if (neighborsAlive === 2 || neighborsAlive === 3) {
                nextUniverse[x][y] = 1;
              } else {
                nextUniverse[x][y] = 0;
              }
            } else {
              if (neighborsAlive === 3) {
                nextUniverse[x][y] = 1;
              } else {
                nextUniverse[x][y] = 0;
              }
            }
          }
        }
      });
    }
  };

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    setGenerations((generation) => generation + 1);
    setUniverse(getNextGeneration);
    setTimeout(runSimulation, 475);
  }, []);

  return (
    <main className='main'>
      <Sidebar
        presets={presets}
        userSaves={userSaves}
        handleNewUniverse={handleNewUniverse}
      />
      <div className='game-of-life'>
        <Universe updateUniverse={updateUniverse} />
        <Menu
          onChange={handleChange}
          onPlayStop={handlePlayStop}
          onReset={handleReset}
          onClear={handleClear}
          onSave={handleSave}
          isRunning={runningRef.current}
        ></Menu>
      </div>
      <About generations={generations} />
    </main>
  );
};

export default App;
