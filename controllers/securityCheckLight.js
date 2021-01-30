const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { secretOrPrivateKey } = require('../config/environment')

async function securityCheckLight(req, _res, next){
  try {
    const token = req.headers.authorization.replace('Bearer ', '')
    if (!token) return null
    const payload = jwt.verify(token, secretOrPrivateKey)
    const user = await User.findById(payload.sub)

    if (!user) return null

    req.currentUser = user

    //They provided token, it was valid, and we found a user (with id) associated with that token
    next()

  } catch (err){
    next(err)
  }
}

module.exports = {
  securityCheckLight
}