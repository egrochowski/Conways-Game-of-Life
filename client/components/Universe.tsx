import * as React from 'react';
import { IUpdateUniverse } from '../Interfaces/IUniverse';
import styled from 'styled-components';

const numCols = 50;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${numCols}, 1rem);
  margin: 0 2rem 1rem 2rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Universe: React.FC<IUpdateUniverse> = ({ updateUniverse }) => (
  <Wrapper>
    <div className='nav'>
      <h1>
        <a
          href='https://en.wikipedia.org/wiki/John_Horton_Conway'
          id='conway'
          target={'_blank'}
        >
          {`John Conway`}
        </a>
        {`'s Game of Life`}
      </h1>
    </div>
    <Grid className='universe'>{updateUniverse()}</Grid>
  </Wrapper>
);

export default Universe;
