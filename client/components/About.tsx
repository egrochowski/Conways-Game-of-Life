import * as React from 'React';

interface Count {
  generations: number;
}

const About: React.FC<Count> = ({ generations }) => (
  <div className='about'>
    <a href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life'>
      About Conway's Game of Life
    </a>
    <p>Generations: {generations}</p>
  </div>
);

export default About;
