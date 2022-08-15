const usersModel = require('../models/users.model')

module.exports = {
  insert: async (values) => {
    const result = await usersModel.create(values)
    return result
  }
}