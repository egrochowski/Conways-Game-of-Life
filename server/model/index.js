const db = require('./../db/');

module.exports = {
  getPresets: async () => {
    return await db.find({ preset: true });
  },

  getUserSaves: async () => {
    return await db.find({ preset: false });
  },

  addUniverse: async (universe) => {
    const newUniverse = await new db(universe).save().catch(console.error);
  },
};
