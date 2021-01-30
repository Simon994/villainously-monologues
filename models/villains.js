
const mongoose = require('mongoose')

// * Create your Schema here
const superVillainsSchema = new mongoose.Schema({
  quote: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  aliases: [{ type: String }],
  source: { type: String, required: true },
  image: { type: String, required: true }, 
  nemesis: { type: String },
  quoteContext: { type: String },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
})



module.exports = mongoose.model('Villain', superVillainsSchema)






