import { Router } from 'express';
import { getAll, saveUniverse } from './../handlers';

const router = Router();

router.get('/universes', getAll);
router.post('/universe', saveUniverse);

export default router;
