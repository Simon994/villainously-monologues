
const mongoose = require('mongoose')
const { dbURI } = require('../config/environment')
const villains = require('./data/villains') //seed data
const Villains = require('../models/villains') //model

const User = require('../models/user')
const userData = require('./data/users')

mongoose.connect(dbURI,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  async (err) => {
    if (err){
      console.log(err)
      return
    }

    try {
      await mongoose.connection.db.dropDatabase()
      console.log('DB dropped! 💧')

      //make users first, before villains
      const users = await User.create(userData)
      console.log(users.length, 'users 🦄')

      //once users made, made map over villains; for this example, we just have one user be the owner for all villains
      const villainsWithUsers = villains.map(character => {
        character.owner = users[0]._id
        return character
      })


      const villainsRemade = await Villains.create(villainsWithUsers)
      console.log(`${villainsRemade.length} villains have been remade 🌅`)
    } catch (err) {
      console.log(err)
    }

    console.log('I am out of here 👋')

    await mongoose.connection.close()
  }

)