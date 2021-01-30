
const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

//All outgoing users, delete password when json transofrmation takes place
userSchema.set('toJSON', {
  // virtuals: true,
  transform(doc, json) {
    delete json.password
    delete json.email
    return json
  }
})

//set a virtual attribute (won't persist to mongodb)
userSchema.virtual('passwordConfirm')
  .set(function (plaintextPassword) {
    this._passwordConfirm = plaintextPassword
  })

//lifecycle (prevalidate) hook to check password confirmation:
userSchema.pre('validate', function(next){
  if (this.isModified('password') && 
  this.password !== this._passwordConfirm){
    this.invalidate('passwordConfirm', 'must match confirmation') 
  } 

  next()
}) 

//hash the password
userSchema.pre('save', function (next){
  if (this.isModified('password')){ 
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
  }
  next()
})

//create method on Schema to compare plaintextPassword to hashed password
//we will call in controller (auth) for POST to /login
userSchema.methods.validatePassword = function(plaintextPassword){
  return bcrypt.compareSync(plaintextPassword, this.password)
}

//export a Model, User
module.exports = mongoose.model('User', userSchema)