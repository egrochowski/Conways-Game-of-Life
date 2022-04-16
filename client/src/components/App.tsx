import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactElement,
} from 'react';
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

const App: React.FC = (): ReactElement => {
  const [stateName, setStateName] = useState('');
  const [generations, setGenerations] = useState(0);
  const [universe, setUniverse] = useState<number[][]>(reset); // current universe rendered to page
  const [presets, setPresets] = useState<IUniverse[]>([]);
  const [userSaves, setUserSaves] = useState<IUniverse[]>([]);
  const [isRunning, setAction] = useState(false);
  const runningRef = useRef(isRunning);
  runningRef.current = isRunning;

  useEffect(() => {
    getUserSaves();
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

  const universeReducer = (name: string, universe: number[][]) => {
    return { name, universe, userSave: true };
  };

  const getUserSaves = (): void => {
    const universes: IUniverse[] = JSON.parse(
      localStorage.getItem('universes') || '[]'
    );
    setUserSaves(universes);
  };

  const getUniverses = (): void => {
    axios
      .get('/universes')
      .then((universes: AxiosResponse) => {
        setPresets(universes.data);
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

  const handleNewUniverse = (userSave: boolean, index: number) => {
    setAction(false);
    setUniverse((universe: number[][]) =>
      produce(universe, () =>
        userSave ? userSaves[index].universe : presets[index].universe
      )
    );
    setGenerations(0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStateName(e.target.value);
  };

  const savePreset = () => {
    axios
      .post('/universe', {
        name: stateName,
        universe: initialState,
      })
      .then(() => getUniverses())
      .catch((e) => {
        console.error(e);
      });
  };

  const handleSave = () => {
    if (initialState) {
      let currentUniverses: IUniverse[] = JSON.parse(
        localStorage.getItem('universes') || '[]'
      );

      localStorage.setItem(
        'universes',
        JSON.stringify([
          ...currentUniverses,
          universeReducer(stateName, initialState),
        ])
      );
      getUserSaves();
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
    const operations = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];
    return produce(universe, (nextUniverse: number[][]) => {
      // x and y represent a cell's coordinates in the universe
      for (let x = 0; x < numRows; x++) {
        for (let y = 0; y < numCols; y++) {
          let neighborsAlive = 0;

          operations.forEach(([row, col]) => {
            let i = row + x;
            let j = col + y;
            if (i >= 0 && i < numRows && j >= 0 && j < numCols) {
              neighborsAlive += universe[i][j];
            }
          });

          if (neighborsAlive < 2 || neighborsAlive > 3) {
            nextUniverse[x][y] = 0;
          } else if (!universe[x][y] && neighborsAlive === 3) {
            nextUniverse[x][y] = 1;
          }
        }
      }
    });
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
