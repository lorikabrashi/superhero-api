const express = require('express')
const router = express.Router()

const userController = require('../controllers/user.controller')


/* POST insert User. */
router.post('/', async (req, res) => {
  try {
    const result = await userController.add(req.body)
    res.json(result)
  } catch (err) {
    res.json(err.message)
  }
})

module.exports = router
