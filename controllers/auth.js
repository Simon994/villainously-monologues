

//Need: 
//   a Model (User) -- to create docs on db;
//   jwt -- to return JsonWebToken via .sign()
//   secretOrPrivateKey -- for jwt.sign()

const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { secretOrPrivateKey }  = require('../config/environment')
const { unauthorized } = require('../lib/errorMsgs')

//Controllers to handle:

//POST to /register
async function register(req, res, next){
  try {
    const user = await User.create(req.body)
    res.status(201).json({ message: `Welcome ${user.username}!` })

  } catch (err) {
    next(err)
  }
}

//POST to /login
async function login(req, res, next){
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user ||
      !user.validatePassword(req.body.password)){
      throw new Error(unauthorized)
    }
    const token = jwt.sign({ sub: user._id }, secretOrPrivateKey, { expiresIn: '14 days' })
    res.status(202)
      .json({ message: `Welcome back ${user.username}!`, token: token } )
      
  } catch (err) {
    next(err)
  }
}

//exporting functions for router access
module.exports = {
  register,
  login
}