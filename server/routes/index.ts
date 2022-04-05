import { Router } from 'express';
import { getAll, getPresets, getUserSaves, saveUniverse } from './../handlers';

const router = Router();

router.get('/universes', getAll);
router.get('/presets', getPresets);
router.get('/userSaves', getUserSaves);
router.post('/universe', saveUniverse);

export default router;
