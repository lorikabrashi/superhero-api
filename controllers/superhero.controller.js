const superheroService = require('../services/superhero.service')
module.exports = {
  add: async (params) => {
    const result = await superheroService.insert(params)
    return result
  },
  getAll: async () => {
    const result = await superheroService.get()
    return result
  },
  getSuperhero: async (id) => {
    const result = await superheroService.getSingleByID(id)
    return result
  },
  editSuperhero: async (id, data) => {
    const result = await superheroService.editById(id, data)
    return result
  }
}