const superheroModel = require('../models/superhero.model')
module.exports = {
  insert: async (values) => {
    const result = await superheroModel.create(values)
    return result
  },
  get: async () => {
    const result = await superheroModel.find().limit(50)
    return result
  },
  getSingleByID: async (id) => {
    const result = await superheroModel.findById(id)
    return result
  },
  editById: async (id, data) => {
    const result = await superheroModel.findByIdAndUpdate(id, data) 
    return result
  }
}