export default interface IUniverse {
  name: string;
  universe: number[][];
  userSave: boolean;
}

export interface IUpdateUniverse {
  updateUniverse(): React.ReactNode;
}
