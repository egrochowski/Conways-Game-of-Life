import * as React from "react";
import styled from "styled-components";

const CellStyle = styled.div`
  height: 15px;
  width: 15px;
  border: solid black 1px;
`;

interface Props {
  cellState: number;
}

const Cell: React.FC<Props> = ({ cellState }) => {
  return <CellStyle>{cellState}</CellStyle>;
};

export default Cell;
