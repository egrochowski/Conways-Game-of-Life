import * as React from "react";
import styled from "styled-components";

const numCols = 50;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${numCols}, 15px);
  cursor: pointer;
`;

interface IUniverse {
  updateUniverse(): any;
}

const Universe: React.FC<IUniverse> = ({ updateUniverse }) => {
  return (
    <>
      <Grid className="universe">{updateUniverse()}</Grid>
    </>
  );
};

export default Universe;
