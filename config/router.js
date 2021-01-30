
const express = require('express')
const router = express.Router()

const villainsRoutes = require('../controllers/villains')
const auth = require('../controllers/auth')
const { securityControl } = require('../controllers/securityControl' )
const { securityCheckLight } = require('../controllers/securityCheckLight')

//CONTENT
router.route('/villains')
  .get(villainsRoutes.index)
  .post(securityControl, villainsRoutes.create)
  
router.route('/villains/:id')
  .get(securityCheckLight, villainsRoutes.show)
  .delete(securityControl, villainsRoutes.delete)
  .put(securityControl, villainsRoutes.update)
  

//USER
router.route('/register')
  .post(auth.register)  
    
router.route('/login')
  .post(auth.login)


module.exports = router
  