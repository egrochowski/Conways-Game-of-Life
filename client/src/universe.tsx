import * as React from "react";
import produce, { Immer } from "immer";
import styled from "styled-components";

const numRows = 30;
const numCols = 50;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${numCols}, 15px);
`;

const Cell = styled.div`
  height: 15px;
  width: 15px;
  border: solid 1px #555;
`;

const Universe: React.FC = () => {
  const [universe, setUniverse] = React.useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      // create an empty universe; all cells are dead
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  });
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
      <Grid>
        {universe.map((row, i) => {
          return row.map((cellStatus, j) => {
            return (
              <Cell
                className={cellStatus ? "alive" : "dead"}
                key={`${i}-${j}`}
                onClick={() => {
                  const uniCopy = produce(universe, (uniCopy) => {
                    uniCopy[i][j] = cellStatus ? 0 : 1;
                  });
                  setUniverse(uniCopy);
                }}
              ></Cell>
            );
          });
        })}
      </Grid>
      <button
        onClick={() => {
          setAction(!isRunning);
          if (!isRunning) {
            runningRef.current = true;
            runSimulation();
          }
        }}
      >
        {isRunning ? "Stop" : "Start"}
      </button>
    </>
  );
};

export default Universe;
