
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { secretOrPrivateKey } = require('../config/environment')
const { forbidden } = require('../lib/errorMsgs')

async function securityControl(req, _res, next){
  try {
    if (!req.headers.authorization){
      throw new Error(forbidden)
    }
    const token = req.headers.authorization.replace('Bearer ', '')
    const payload = jwt.verify(token, secretOrPrivateKey)
    const user = await User.findById(payload.sub)

    if (!user){
      throw new Error(forbidden)
    } 

    //Add to req, property of currentUser, with value of user
    req.currentUser = user

    //They provided token, it was valid, and we found a user (with id) associated with that token
    next()

  } catch (err){
    next(err)
  }
}

module.exports = {
  securityControl
}