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
  border: solid black 1px;
`;

const Universe: React.FC = () => {
  const [universe, setUniverse] = useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      // create an empty universe; all cells are dead
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  });

  // copy of universe for next generation
  let nextUniverse = universe;

  return (
    <Grid>
      {universe.map((row, i) => {
        return row.map((cellStatus, j) => {
          return (
            <Cell
              className={cellStatus ? "alive" : "dead"}
              key={`${i}-${j}`}
              onClick={() => {
                nextUniverse[i][j] = !cellStatus ? 1 : 0;
                setUniverse(Array.from(nextUniverse));
              }}
            ></Cell>
          );
        });
      })}
    </Grid>
  );
};

export default Universe;
