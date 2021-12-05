const model = require("./../model/");

module.exports = {
  getPresets: (req, res) => {
    res.send(model.getPresets());
  },
};
