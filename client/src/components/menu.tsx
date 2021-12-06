import * as React from "react";

interface Actions {
  onPlayStop(): void;
  onReset(): void;
  onSave(): void;
  isRunning: boolean;
}

const Menu: React.FC<Actions> = ({
  onPlayStop,
  onReset,
  onSave,
  isRunning,
}) => (
  <div className="menu">
    <button onClick={onPlayStop}>{isRunning ? "Stop" : "Start"}</button>
    <button className="reset" onClick={onReset}>
      Clear
    </button>
    <button className="save" onClick={onSave}>
      Save Initial State
    </button>
  </div>
);

export default Menu;
