import React, { ReactElement } from 'react';
import IUniverse from './../Interfaces/IUniverse';
import { Universe } from './../types/universe';

const Sidebar: React.FC<Universe> = ({
  presets,
  userSaves,
  handleNewUniverse,
}): ReactElement => {
  const displayUniverses = (universes: IUniverse[]) => {
    return universes.map((universe, index) => (
      <span
        key={index}
        className='preset'
        onClick={() => {
          handleNewUniverse(universe.preset, index);
        }}
      >
        {universe.name}
      </span>
    ));
  };

  return (
    <div className='sidebar'>
      <div className='presets-header'>Presets</div>
      <div className='preset-container'>{displayUniverses(presets)}</div>
      <div className='presets-header'>User Saves</div>
      <div className='preset-container'>{displayUniverses(userSaves)}</div>
    </div>
  );
};

export default Sidebar;
