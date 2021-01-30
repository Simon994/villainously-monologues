
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/supervillains'
const port = process.env.PORT || 5000
const  secretOrPrivateKey = process.env.SECRET || 'you have discovered the meaning of life'

module.exports = {
  dbURI,
  port,
  secretOrPrivateKey
}