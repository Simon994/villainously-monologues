
const Villain = require('../models/villains')
const { nothingFound, forbidden } = require('../lib/errorMsgs')

function findVillainId(id){
  return Villain.findById(id)
}

async function getVillainIndex(req, res) {
  const villainsIndex = await Villain.find()
  res.status(200).json(villainsIndex)
}

async function createVillain(req, res, next){
  try {
    //merge req.body, which comes from user, and req.currentUser, which we add in securityControl
    //this newVillainData should now container owner key with value of (owner)id
    const newVillainData = { ...req.body, owner: req.currentUser._id }
    
    const createdVillain = await Villain.create(newVillainData)
    res.status(201).json(createdVillain)
    return
  } catch (err) {
    next(err)
  }
}

async function showVillain(req, res, next){
  try {
    const foundVillain = await findVillainId(req.params.id)
      .populate('owner')
    if (!foundVillain) throw new Error(nothingFound)

    //Check, is user signed in, if so, is current user the owner of the quote?

    let editDeleteAllow
    if (!req.currentUser){
      editDeleteAllow = false
    } else {
      editDeleteAllow = foundVillain.owner.equals(req.currentUser._id)
    } 
    
    
    
    res.status(200).json({
      foundVillain,
      editDeleteAllow 
    })

  } catch (err) {
    next(err)
  }
}

async function deleteVillain(req, res, next){
  try {
    const foundVillain = await findVillainId(req.params.id)
    if (!foundVillain) throw new Error(nothingFound)

    if (!foundVillain.owner.equals(req.currentUser._id)) throw new Error(forbidden)

    await foundVillain.remove()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

async function updateVillain(req, res, next){
  try {
    const villainToUpdate = await findVillainId(req.params.id)
    if (!villainToUpdate) throw new Error(nothingFound)

    //only allow update if user is the owner
    if (!villainToUpdate.owner.equals(req.currentUser._id)) throw new Error(forbidden)

    Object.assign(villainToUpdate, req.body)
    await villainToUpdate.save()

    res.status(202).json(villainToUpdate)
    return
    
  } catch (err) {
    next(err)
  }
}

module.exports = {
  index: getVillainIndex,
  create: createVillain,
  show: showVillain,
  delete: deleteVillain,
  update: updateVillain
}