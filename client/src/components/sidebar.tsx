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
  <div className="preset">
    {presets.map((universe, index) =>
      universe.preset ? (
        <span
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
