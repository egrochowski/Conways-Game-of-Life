const db = require("./../db/");

module.exports = {
  getPresets: async () => {
    return await db.find({});
  },

  addUniverse: async (universe) => {
    const newUniverse = await new db(universe).save().catch(console.error);
  },
};
