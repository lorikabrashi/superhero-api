const superheroService = require('../services/superhero.service')
module.exports = {
  add: async (params) => {
    const result = await superheroService.insert(params)
    return result
  } 
}