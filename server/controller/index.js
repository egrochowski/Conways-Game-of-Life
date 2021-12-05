const model = require("./../model/");

module.exports = {
  getPresets: async (req, res) => {
    res.send(await model.getPresets());
  },

  addUniverse: (req, res) => {
    model.addUniverse(req.body);
    res.sendStatus(201);
  },
};
