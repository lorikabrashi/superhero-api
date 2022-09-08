const constants = require('../lib/constants')
const usersModel = require('../models/users.model')

module.exports = {
  insert: async (values) => {
    const result = await usersModel.create(values)
    return result
  },
  findByEmail: async (email) => {
    const result = await usersModel.findOne({ email }).exec()
    return result
  },
  updatePassword: async (_id, password) => {
    const result = await usersModel.findByIdAndUpdate(_id, { password }).exec()
    return result
  },
  verifyAccount: async (_id) => {
    const result = await usersModel.findByIdAndUpdate(_id, { verified: true }).exec()
    return result
  },
  getAdmins: async () => {
    const result = await usersModel.findOne({ role: constants.role.ADMIN })
    return result
  },
  getFavorites: async (_id) => {
    const result = await usersModel.findById(_id).select('favorites').exec()
    return result
  },
  addFavorite: async (userID, superheroID) => {
    const result = await usersModel.updateOne({ _id: userID }, { $push: { favorites: superheroID } }).exec()
    return result
  },
  removeFavorite: async (userID, superheroID) => {
    const result = await usersModel.updateOne({ _id: userID }, { $pull: { favorites: superheroID } }).exec()
    return result
  },
  getUser: async (userID) => {
    const result = await usersModel.findById(userID).select('-password')
    return result
  },
  updateUser: async (userID, data) => {
    const result = await usersModel.findByIdAndUpdate(userID, data).exec()
    return result._id
  },
  updatePicture: async (userID, fileName) => {
    const result = await usersModel.findByIdAndUpdate(userID, {profilePicture: fileName}).exec()
    return result._id
  }

}
