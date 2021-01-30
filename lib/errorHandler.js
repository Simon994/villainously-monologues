
const { validationError,
  castError,
  nothingFound, 
  unauthorized,
  forbidden } = require('./errorMsgs')


function errorHandler(err, _req, res, next){

  if (err.name === validationError){

    const customErrors = {}
    for (const key in err.errors){
      customErrors[key] = err.errors[key].message
    }

    return res.status(422).json(
      { 
        message: 'Problem with form validation:',
        errors: customErrors
      })

  }

  if (err.name === castError || err.message === nothingFound){
    return res.status(404).json(nothingFound)
  }

  if (err.message === unauthorized){
    return res.status(401).json(unauthorized)
  }

  if (err.message === forbidden){
    return res.status(403).json(forbidden)
  }


  res.sendStatus(500)
  next(err)
}

module.exports = {
  errorHandler
}