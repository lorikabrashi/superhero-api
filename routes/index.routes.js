const express = require('express');
const { jsonResponse } = require('../lib/helper');
const router = express.Router();
const authController = require('../controllers/auth.controller')
const fieldMiddleware = require('../middleware/field.middleware')
 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json(jsonResponse('index'));
});

router.post('/login', async (req, res) => {
  try{
    // console.log('here')
    // res.json(jsonResponse('ok'))
    const result = await authController.login(req.body)
    res.json(jsonResponse(result))

  }
  catch(err){
    res.status(400).json(jsonResponse(err.message, false))
  }
})

module.exports = router;
