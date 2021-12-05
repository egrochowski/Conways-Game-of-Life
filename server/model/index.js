const db = require("./../db/");

module.exports = {
  getPresets: async () => {
    return await db.find({});
  },

  addUniverse: async (universe) => {
    const newUniverse = await new db(universe)
      .save()
      .then(() => console.log("we did it ?"))
      .catch((e) => console.error(e));
  },
};
