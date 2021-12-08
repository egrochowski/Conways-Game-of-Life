import * as React from "react";
import Universe from "./universe.tsx";
import Sidebar from "./sidebar.tsx";
import Menu from "./menu.tsx";
import About from "./about.tsx";
import axios from "axios";
import produce from "immer";

const numRows = 30;
const numCols = 50;
let initialState: number[][];
let initialized = false;
let generations = 0;

const reset = () => {
  const uni = [];
  for (let i = 0; i < numRows; i++) {
    // create an empty universe; all cells are dead
    uni.push(Array.from(Array(numCols), () => 0));
  }
  return uni;
};

const App = () => {
  const [stateName, setStateName] = React.useState("");

  const [universe, setUniverse] = React.useState(reset);
  const [presets, setPresets] = React.useState([]);
  const [isRunning, setAction] = React.useState(false);
  const runningRef = React.useRef(isRunning);
  runningRef.current = isRunning;

  React.useEffect(() => {
    getPresets();
  }, []);

  const udpateUniverse = () =>
    universe.map((row: number[], i: number) => {
      return row.map((cellStatus: number, j: number) => {
        return (
          <div
            className={cellStatus ? "alive cell" : "dead cell"}
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

  const getPresets = () => {
    axios
      .get("/presets")
      .then((results) => setPresets(results.data))
      .catch((error) => {
        error;
      });
  };

  const handlePlayStop = () => {
    setAction(!isRunning);
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
    generations = 0;
    initialized = false;
    setAction(false);
    setUniverse((uni: number[][]) => produce(uni, reset));
    initialState = reset();
  };

  const handleNewPreset = (index: number) => {
    setAction(false);
    setUniverse((universe: number[][]) =>
      produce(universe, () => presets[index].universe)
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStateName(e.target.value);
  };

  const handleSave = () => {
    if (initialState) {
      axios
        .post("/presets", {
          name: stateName,
          preset: false,
          universe: initialState,
        })
        .then(() => getPresets())
        .catch((e) => {
          console.error(e);
        });
    }
  };

  const handleReset = () => {
    if (!initialState) {
      return;
    }
    generations = 0;
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

  const runSimulation = React.useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    generations++;
    setUniverse(getNextGeneration);
    setTimeout(runSimulation, 500);
  }, []);

  return (
    <>
      <div className="container">
        <div className="main">
          <Sidebar presets={presets} handleNewPreset={handleNewPreset} />
          <div className="game-of-life">
            <Universe updateUniverse={udpateUniverse} />
            <Menu
              className="options-menu"
              onChange={handleChange}
              onPlayStop={handlePlayStop}
              onReset={handleReset}
              onClear={handleClear}
              onSave={handleSave}
              isRunning={runningRef.current}
            ></Menu>
          </div>
          <About generations={generations} />
        </div>
      </div>
    </>
  );
};

export default App;
