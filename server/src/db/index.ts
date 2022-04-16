const mongoose = require('mongoose');
const URI = 'mongodb://localhost/game-of-life';

mongoose.connect(URI);

const db = mongoose.connection;

db.on('error', () => {
  console.log('Error connecting to database');
});

const UniverseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    universe: { type: Array, required: true },
  },
  {
    timestamps: true,
  }
);

export const universeModel = mongoose.model('universes', UniverseSchema);
