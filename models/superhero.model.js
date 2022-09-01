const mongoose = require('mongoose')

const superheroSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    powerstats: {
      intelligence: Number,
      strength: Number,
      speed: Number,
      durability: Number,
      power: Number,
      combat: Number,
    },
    appearance: {
      gender: String,
      race: String,
    },
    biography: {
      fullName: { type: String },
      aliases: [String],
      alignment: String,
    },
    images: { type: String },
    publisher: { type: String },
  },
  {
    timestamps: true,
  }
)

const superhero = mongoose.model('Superheros', superheroSchema)
module.exports = superhero
