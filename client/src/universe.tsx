import * as React from "react";
import { useState } from "react";
import Cell from "./cell.tsx";
import styled from "styled-components";

const numRows = 35;
const numCols = 55;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${numCols}, 15px);
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

  return (
    <Grid>
      {universe.map((row, i) => {
        return row.map((cellStatus, j) => {
          return <Cell key={`${i}-${j}`} cellStatus={cellStatus} />;
        });
      })}
      )
    </Grid>
  );
};

export default Universe;
