const express = require('express')
const router = express.Router()

const userController = require('../controllers/user.controller')

const { jsonResponse } = require('../lib/helper')
const { verifyForgotPasswordToken, verifyRegistrationToken } = require('../middleware/auth.middleware')
const { password, validate } = require('../middleware/field.middleware')
router.get('/', (req, res) => {
  res.json(jsonResponse('ok'))
})

router.put('/forgot-password', verifyForgotPasswordToken, password, validate, async (req, res) => {
  try {
    const response = await userController.changePassword(req.body.password, req.decoded)
    res.json(jsonResponse(response))
  } catch (err) {
    res.status(500).json(jsonResponse(err.message, false))
  }
})

router.put('/verify', verifyRegistrationToken, async (req, res) => {
  try {
    const response = await userController.verifyAccount(req.decoded)
    res.json(jsonResponse(response))
  } catch (err) {
    res.status(500).json(jsonResponse(err.message, false))
  }
})

module.exports = router
