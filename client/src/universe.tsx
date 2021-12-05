import * as React from "react";
import produce from "immer";
import styled from "styled-components";

const numRows = 30;
const numCols = 50;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${numCols}, 15px);
`;

let initialState: number[][];
let initialized = false;

const reset = () => {
  const uni = [];
  for (let i = 0; i < numRows; i++) {
    // create an empty universe; all cells are dead
    uni.push(Array.from(Array(numCols), () => 0));
  }
  return uni;
};

const Universe: React.FC = () => {
  const [universe, setUniverse] = React.useState(reset);
  const [isRunning, setAction] = React.useState(false);
  const runningRef = React.useRef(isRunning);
  runningRef.current = isRunning;

  const runSimulation = React.useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    setUniverse(getNextGeneration);

    setTimeout(runSimulation, 500);
  }, []);

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

  return (
    <>
      <Grid className="universe">
        {universe.map((row, i) => {
          return row.map((cellStatus, j) => {
            return (
              <div
                className={cellStatus ? "alive cell" : "dead cell"}
                key={`${i}-${j}`}
                onClick={() => {
                  setUniverse(
                    produce(universe, (uniCopy) => {
                      uniCopy[i][j] = cellStatus ? 0 : 1;
                    })
                  );
                }}
              ></div>
            );
          });
        })}
      </Grid>
      <div className="menu">
        <button
          onClick={() => {
            setAction(!isRunning);
            if (!initialized) {
              console.log("hi");
              initialized = true;
              initialState = universe;
            }
            if (!isRunning) {
              runningRef.current = true;
              runSimulation();
            }
          }}
        >
          {isRunning ? "Stop" : "Start"}
        </button>
        <button
          className="reset"
          onClick={() => {
            setAction(false);
            setUniverse((uni) => produce(uni, reset));
          }}
        >
          Clear
        </button>
      </div>
    </>
  );
};

export default Universe;
