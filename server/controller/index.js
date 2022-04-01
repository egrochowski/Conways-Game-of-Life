const model = require('./../model/');

module.exports = {
  getPresets: async (req, res) => {
    try {
      res.send(await model.getPresets());
    } catch (error) {
      res.status(500).send(error);
    }
  },

  addUniverse: (req, res) => {
    try {
      model.addUniverse(req.body);
      res.sendStatus(201);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  getUserSaves: async (req, res) => {
    try {
      res.send(await model.getUserSaves());
    } catch (error) {
      res.sendStatus(500).send(error);
    }
  },
};
