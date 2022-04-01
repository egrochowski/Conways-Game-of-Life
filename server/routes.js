const router = require('express').Router();
const controller = require('./controller');

router.get('/universes', controller.getAll);
router.get('/presets', controller.getPresets);
router.get('/userSaves', controller.getUserSaves);
router.post('/presets', controller.addUniverse);

module.exports = router;
