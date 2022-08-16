const express = require('express')
const router = express.Router()
const superheroController = require('../controllers/superhero.controller')
const { jsonResponse } = require('../lib/helper')
const { verifyToken } = require('../middleware/auth.middleware')

router.post('/', verifyToken, async (req, res) => {
  try {
    const result = await superheroController.add(req.body)
    res.json(jsonResponse(result))
  } catch (err) {
    res.json(jsonResponse(err.message, false))
  }
})

module.exports = router
