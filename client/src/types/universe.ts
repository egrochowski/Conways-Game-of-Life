import IUniverse from './../Interfaces/IUniverse';

export type Universe = {
  presets: IUniverse[];
  userSaves: IUniverse[];
  handleNewUniverse(preset: boolean, index: number): void;
};
