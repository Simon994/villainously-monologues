const express = require('express')
const app = express()
const mongoose = require('mongoose')

const { dbURI, port } = require('./config/environment')
const logger = require('./lib/logger')
const router = require('./config/router')
const { errorHandler } = require('./lib/errorHandler')

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex: true },
  (err) => {
    if (err) {
      console.log(err)
      return
    }
    console.log('Mongo is Connected ✅')
  }
)

app.use(express.static(`${__dirname}/frontend/build`))

app.use(express.json())

app.use(logger)

app.use('/api', router)

app.use('/*', (_, res) => res.sendFile(`${__dirname}/frontend/build/index.html`))

app.use(errorHandler)


app.listen(port, () => console.log(`Listening on Port: ${port}`))
