const mongoose = require('mongoose')

const superheroSchema = new mongoose.Schema(
  {
    nickname: { type: String, required: true },
    power: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const superhero = mongoose.model('Superheros', superheroSchema)
module.exports = superhero
