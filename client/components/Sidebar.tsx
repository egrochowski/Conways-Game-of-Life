import * as React from 'react';

interface Presets {
  createdAt: String;
  name: String;
  preset: boolean;
  universe: number[][];
}

type PresetsType = {
  presets: Presets[];
  handleNewPreset(index: number): void;
};

const Sidebar: React.FC<PresetsType> = ({ presets, handleNewPreset }) => (
  <div className='sidebar'>
    <div className='presets-header'>Presets</div>
    <div className='preset-container'>
      {presets.map((universe, index) => (
        <span
          key={index}
          className='preset'
          onClick={() => {
            handleNewPreset(index);
          }}
        >
          {universe.name}
        </span>
      ))}
    </div>
    <div className='presets-header'>User Saves</div>
    <div className='preset-container'></div>
  </div>
);

export default Sidebar;
