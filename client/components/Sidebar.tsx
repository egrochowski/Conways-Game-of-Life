import * as React from 'react';

interface Universe {
  createdAt: String;
  name: String;
  preset: boolean;
  universe: number[][];
}

type UniverseType = {
  presets: Universe[];
  userSaves: Universe[];
  handleNewUniverse(preset: boolean, index: number): void;
};

const Sidebar: React.FC<UniverseType> = ({
  presets,
  userSaves,
  handleNewUniverse,
}) => {
  const displayUniverses = (universes: Universe[]) => {
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
