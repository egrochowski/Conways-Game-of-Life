export default interface IUniverse {
  _id: string;
  name: string;
  preset: boolean;
  universe: number[][];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IUpdateUniverse {
  updateUniverse(): React.ReactNode;
}
