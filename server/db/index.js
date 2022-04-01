const mongoose = require('mongoose');
const URI = 'mongodb://localhost/game-of-life';

mongoose.connect(URI);

const db = mongoose.connection;

db.on('error', () => {
  console.log('Error connecting to database');
});

const Universes = new mongoose.Schema(
  {
    name: { type: String, required: true },
    preset: { type: Boolean, default: false },
    universe: { type: Array, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('universes', Universes);
