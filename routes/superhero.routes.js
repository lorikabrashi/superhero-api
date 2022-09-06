const express = require('express')
const router = express.Router()
const superheroController = require('../controllers/superhero.controller')
const { jsonResponse } = require('../lib/helper')
const { verifyToken } = require('../middleware/auth.middleware')
const upload = require('../services/upload.service')

router.get('/all', verifyToken, async (req, res) => {
  try{
    const result = await superheroController.getAll()
    res.json(jsonResponse(result))
  }
  catch(err){
    res.json(jsonResponse(err.message, false))
  }
})

router.get('/:id', verifyToken, async (req, res) => {
  try{
    const result = await superheroController.getSuperhero(req.params.id)
    res.json(jsonResponse(result))
  }
  catch(err){
    res.json(jsonResponse(err.message, false))
  }
})

router.post('/:id', verifyToken, async (req, res) => {  
  try{
    const result = await superheroController.editSuperhero(req.params.id, req.body)
    res.json(jsonResponse(result))
  }
  catch(err){
    res.json(jsonResponse(err.message, false))
  }

})

router.post('/', verifyToken, async (req, res) => {
  try {
    const result = await superheroController.add(req.body)
    res.json(jsonResponse(result))
  } catch (err) {
    res.json(jsonResponse(err.message, false))
  }
})

router.post('/edit-image/:id', verifyToken, upload.single('superhero-image'), async (req, res) => {
  try{
    const result = await superheroController.changeImage(req.params.id, req.file)
    res.json(jsonResponse(result))
  }
  catch(err){
    res.json(jsonResponse(err.message, false))
  }
})


module.exports = router
