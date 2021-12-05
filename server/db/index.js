const client = require("mongodb");
const mongoose = require("mongoose");
const URI = "mongodb://localhost/game-of-life";

mongoose.connect(URI);

const db = mongoose.connection;

db.on("error", () => {
  console.log("Error connecting to database");
});

db.once("open", () => {
  console.log("successfully connected to database");
});

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    universe: { type: Array, required: true },
    preset: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("universes", schema);
