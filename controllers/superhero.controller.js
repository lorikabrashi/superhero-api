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
  },
  changeImage: async (id, file) => {
    let fileName = null
    if(file){
      fileName = `/images/${file.filename}` 
    }    
    const result = await superheroService.changeImage(id, fileName)
    return result 
  }
}