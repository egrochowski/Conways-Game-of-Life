import { Request, Response } from 'express';
import db from '../db';

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    res.json(await db.find({}));
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUserSaves = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.json(await db.find({ presets: false }));
  } catch (error) {
    res.sendStatus(500).json(error);
  }
};

export const getPresets = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.json(await db.find({ presets: true }));
  } catch (error) {
    res.status(500).json(error);
  }
};

export const saveUniverse = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.status(201).json(await db(req.body).save());
  } catch (error) {
    res.status(500).json(error);
  }
};
