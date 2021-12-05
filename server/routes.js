const router = require("express").Router();
const controller = require("./controller");

router.get("/presets", controller.getPresets);
router.post("/presets", controller.addUniverse);

module.exports = router;
