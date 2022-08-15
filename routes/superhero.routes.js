const express = require('express')
const router = express.Router()
const superheroController = require('../controllers/superhero.controller')

router.post('/', async (req, res) => {
  try {
    const result = await superheroController.add(req.body)
    res.json(result)
  } catch (err) {
    res.json(err.message)
  }
})

module.exports = router
