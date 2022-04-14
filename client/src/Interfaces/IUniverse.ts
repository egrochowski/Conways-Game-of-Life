export default interface IUniverse {
  name: string;
  universe: number[][];
  preset: boolean;
}

export interface IUpdateUniverse {
  updateUniverse(): React.ReactNode;
}
