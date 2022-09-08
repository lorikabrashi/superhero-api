const userService = require('../services/user.service')
const bcrypt = require('bcrypt')

const emailService = require('../services/email.service')
const jwt = require('jsonwebtoken')
const constants = require('../lib/constants')

module.exports = {
  add: async (params) => {
    const { password, firstName, lastName, age, email } = params

    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT))

    const result = await userService.insert({
      password: hashedPassword,
      firstName,
      lastName,
      age,
      email,
    })
    const token = jwt.sign({ _id: result._id, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 12 }, process.env.JWT_VERIFY_SECRET)
    emailService.sendRegistrationEmail(email, token)
    return result._id
  },

  changePassword: async (password, id) => {
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT))
    const result = await userService.updatePassword(id, hashedPassword)
    return result._id
  },
  verifyAccount: async (id) => {
    const result = await userService.verifyAccount(id)
    return result._id
  },
  checkForAdmin: async () => {
    const admins = await userService.getAdmins()
    if (!admins) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASS, parseInt(process.env.SALT))
      const admin = {
        firstName: 'ADMIN',
        lastName: 'ADMIN',
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        verified: true,
        role: constants.role.ADMIN,
      }
      userService.insert(admin)
    }
  },
  getUserFavorites: async (userId) => {
    const result = await userService.getFavorites(userId)
    return result
  },
  updateFavorite: async (userId, superheroId) => {
    const favoriteList = await userService.getFavorites(userId)
    if (favoriteList.favorites.includes(superheroId)) {
      await userService.removeFavorite(userId, superheroId)
    } else {
      await userService.addFavorite(userId, superheroId)
    }
    const result = await userService.getFavorites(userId)
    return result
  },
  getProfile: async (userId) => {
    const result = await userService.getUser(userId)
    return result
  },
  updateProfile: async (userId, data) => {
    const result = await userService.updateUser(userId, data)
    return result
  },
  updateProfilePicture: async (userId, file) => {
    let fileName = null
    if(file){
      fileName = `/images/${file.filename}` 
    }
    const result = await userService.updatePicture(userId, fileName)
    return result
  }

}
