import { Request, Response } from 'express';
import {
  queryAllUniverses,
  queryPresets,
  queryUserSaves,
  saveUniverse,
} from './../model/';

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    res.json(await queryAllUniverses());
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUserSaves = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.json(await queryUserSaves());
  } catch (error) {
    res.sendStatus(500).json(error);
  }
};

export const getPresets = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.json(await queryPresets());
  } catch (error) {
    res.status(500).json(error);
  }
};

export const addUniverse = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const response = await saveUniverse(req.body);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};
