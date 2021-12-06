import * as React from "react";

interface Presets {
  createdAt: String;
  name: String;
  preset: boolean;
  universe: number[][];
  updatedAt: String;
  _id: String;
}

type PresetsType = {
  presets: Presets[];
  handleNewPreset(index: number): void;
};

const Sidebar: React.FC<PresetsType> = ({ presets, handleNewPreset }) => (
  <div className="sidebar">
    <div className="presets-header">Presets</div>
    {presets.map((universe, index) =>
      universe.preset ? (
        <span
          className="preset"
          onClick={() => {
            handleNewPreset(index);
          }}
        >
          {universe.name}
        </span>
      ) : null
    )}
  </div>
);

export default Sidebar;
