const router = require("express").Router();
const controller = require("./controller");

router.get("/presets", controller.getPresets);

module.exports = router;
