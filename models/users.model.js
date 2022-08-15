const mongoose = require('mongoose')
const constants = require('../lib/constants')
const usersSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    age: { type: Number, min: 1 },
    password: { type: String, required: true },
    profilePicture: { type: String },
    role: { type: String, enum: Object.values(constants.role), required: true, default: constants.role.USER },
    verified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
)

const usersModel = mongoose.model('users', usersSchema)
module.exports = usersModel
