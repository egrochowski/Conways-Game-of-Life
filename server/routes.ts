import { Router } from 'express';
import {
  getAll,
  getPresets,
  getUserSaves,
  addUniverse,
} from './controller/index';

const router = Router();

router.get('/universes', getAll);
router.get('/presets', getPresets);
router.get('/userSaves', getUserSaves);
router.post('/universe', addUniverse);

export default router;
