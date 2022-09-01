const superheroModel = require('../models/superhero.model')
module.exports = {
  insert: async (values) => {
    const result = await superheroModel.create(values)
    return result
  },
  get: async () => {
    const result = await superheroModel.find().limit(50)
    return result
  }
}