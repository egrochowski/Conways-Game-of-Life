import { Request, Response } from 'express';
import { universeModel } from '../db';

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    res.send(await universeModel.find({}).limit(100));
  } catch (error) {
    res.status(500).json(error);
  }
};

export const saveUniverse = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await universeModel(req.body).save();
    res.sendStatus(201);
  } catch (error) {
    res.status(500).json(error);
  }
};
