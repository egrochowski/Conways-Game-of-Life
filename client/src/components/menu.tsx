import * as React from "react";

interface Actions {
  onPlayStop(): void;
  onReset(): void;
  onClear(): void;
  onSave(): void;
  isRunning: boolean;
}

const Menu: React.FC<Actions> = ({
  onPlayStop,
  onReset,
  onClear,
  onSave,
  isRunning,
}) => (
  <div className="menu">
    <button onClick={onPlayStop}>{isRunning ? "Stop" : "Start"}</button>
    <button className="clear" onClick={onClear}>
      Clear
    </button>
    <button className="reset" onClick={onReset}>
      Reset
    </button>
    <button className="save" onClick={onSave}>
      Save Initial State
    </button>
  </div>
);

export default Menu;
