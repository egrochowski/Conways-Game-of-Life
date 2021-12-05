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

const Universes = new mongoose.Schema(
  {
    name: { type: String, required: true },
    universe: { type: Array, required: true },
    preset: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("universes", Universes);
