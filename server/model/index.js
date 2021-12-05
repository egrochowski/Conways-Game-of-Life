const db = require("./../db/");

module.exports = {
  getPresets: async () => {
    const results = db.find({});
    return results;
  },
};
