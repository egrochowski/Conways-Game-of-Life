import {
  queryAllUniverses,
  queryPresets,
  queryUserSaves,
  saveUniverse,
} from './../model/';

import { Request, Response } from 'express';

export const getAll = async (req: Request, res: Response) => {
  try {
    res.send(await queryAllUniverses());
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getUserSaves = async (req: Request, res: Response) => {
  try {
    res.send(await queryUserSaves());
  } catch (error) {
    res.sendStatus(500).send(error);
  }
};

export const getPresets = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.send(await queryPresets());
  } catch (error) {
    res.status(500).send(error);
  }
};

export const addUniverse = (req: Request, res: Response): void => {
  try {
    saveUniverse(req.body);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error);
  }
};
