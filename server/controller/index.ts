import { Request, Response } from 'express';
import {
  queryAllUniverses,
  queryPresets,
  queryUserSaves,
  saveUniverse,
} from './../model/';

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    res.send(await queryAllUniverses());
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getUserSaves = async (
  req: Request,
  res: Response
): Promise<void> => {
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

export const addUniverse = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const response = await saveUniverse(req.body);
    res.status(201).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};
