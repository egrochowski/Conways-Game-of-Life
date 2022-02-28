import * as React from 'react';

interface Actions {
  onPlayStop(): void;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  onReset(): void;
  onClear(): void;
  onSave(): void;
  isRunning: boolean;
}

const Menu: React.FC<Actions> = ({
  onPlayStop,
  onChange,
  onReset,
  onClear,
  onSave,
  isRunning,
}) => (
  <div className='menu'>
    <button onClick={onPlayStop}>{isRunning ? 'Stop' : 'Start'}</button>
    <button className='clear' onClick={onClear}>
      Clear
    </button>
    <button className='reset' onClick={onReset}>
      Reset
    </button>
    <button className='save' onClick={onSave}>
      Save Initial State
    </button>
    <input
      onChange={onChange}
      className='state-name-input'
      name='stateName'
      type='text'
      placeholder='Name your initial save...'
    />
  </div>
);

export default Menu;
