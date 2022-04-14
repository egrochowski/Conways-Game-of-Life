export interface IActions {
  onPlayStop(): void;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  onReset(): void;
  onClear(): void;
  onSave(): void;
  isRunning: boolean;
}
