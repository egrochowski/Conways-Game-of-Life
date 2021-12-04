import * as React from "react";
import { useState } from "react";
import styled from "styled-components";

const numRows = 35;
const numCols = 55;

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
  const [running, setAction] = useState(false);
  const [universe, setUniverse] = useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      // create an empty universe; all cells are dead
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  });

  const runSimulation = (time?: number) => {
    if (!running) {
      return;
    }
    // copy of universe for next generation
    let nextUniverse = universe;
    time = time || 1000;
    setTimeout(() => {
      console.log("Running...");
      setUniverse(Array.from(nextUniverse));
    }, time);
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
                  universe[i][j] = !cellStatus ? 1 : 0;
                  setUniverse(Array.from(universe));
                }}
              ></Cell>
            );
          });
        })}
      </Grid>
      <button
        onClick={() => {
          setAction(true);
          runSimulation();
        }}
      >
        Play
      </button>
      <button onClick={() => setAction(false)}>Stop</button>
    </>
  );
};

export default Universe;
