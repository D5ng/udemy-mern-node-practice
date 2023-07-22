import { RequestHandler } from "express"
import HttpError from "../models/httpError"
import { validationResult } from "express-validator"
import getCoordsForAddress from "../util/location"
import Place from "../models/place-models"
import User from "../models/user-models"
import mongoose from "mongoose"

const getPlaceById: RequestHandler = async (req, res, next) => {
  const placeId = req.params.pid

  let place

  try {
    place = await Place.findById(placeId)
  } catch (err) {
    return next(err)
  }

  if (!place) {
    const error = new HttpError("Could not find a places for the provided id.", 404)
    return next(error)
  }

  res.json({ place: place.toObject({ getters: true }) })
}

const getPlacesUserById: RequestHandler = async (req, res, next) => {
  const userId = req.params.uid

  let places

  try {
    places = await Place.find({ creator: userId }).exec()
    console.log(places)
  } catch (err) {
    const error = new HttpError("Fetching places failed. please try again", 500)
    return next(error)
  }

  if (!places || places.length === 0) {
    const error = new HttpError("Could not find a place for the provided userId.", 404)
    return next(error)
  }

  res.json({ places: places.map((place) => place.toObject({ getters: true })) })
}

const createPlace: RequestHandler = async (req, res, next) => {
  const error = validationResult(req)

  if (!error.isEmpty()) {
    res.status(422)
    return next(new HttpError("Invalid Inputs passed, please check your data", 422))
  }
  const { title, description, address, creator } = req.body

  let coordinates

  try {
    coordinates = await getCoordsForAddress(address)
  } catch (error) {
    return next(error)
  }

  const createdPlace = new Place({
    title,
    description,
    location: coordinates,
    address,
    image: "https://herb-api.hankookilbo.com/api/attaches/image/group/32c2878c-37a0-4c6c-b25f-619aa859aade",
    creator,
  })

  let user

  try {
    user = await User.findById(creator)
  } catch (err) {
    const error = new HttpError("Creating place failed. please try again", 500)
    return next(error)
  }

  if (!user) {
    const error = new HttpError("Could not find user for provided id", 500)
    return next(error)
  }

  console.log(createdPlace)

  try {
    const sess = await mongoose.startSession()
    sess.startTransaction()
    await createdPlace.save({ session: sess })
    user.places.push(createdPlace)
    await user.save()
    await sess.commitTransaction()
  } catch (err) {
    const error = new HttpError("Creating place failed. please try again", 500)
    return next(error)
  }

  res.status(201).json({ plcae: createdPlace })
}

const updatePlace: RequestHandler = async (req, res, next) => {
  const error = validationResult(req)

  if (!error.isEmpty()) {
    res.status(422)
    throw new HttpError("Invalid Inputs passed, please check your data", 422)
  }
  const { title, description } = req.body
  const placeId = req.params.pid

  let place

  try {
    place = (await Place.findByIdAndUpdate(placeId, { title, description }))!
  } catch (err) {
    const error = new HttpError("Something went wrong. could not update place", 500)
    return next(error)
  }

  try {
    await place.save()
  } catch (err) {
    const error = new HttpError("Something went wrong. could not update place", 500)
    return next(error)
  }

  res.status(201).json({ place: place.toObject({ getters: true }) })
}

const deletePlace: RequestHandler = async (req, res, next) => {
  const placeId = req.params.pid

  let place

  try {
    place = await Place.findByIdAndDelete(placeId)
  } catch (err) {
    const error = new HttpError("Someting went wrong. Could not delete place")
    return next(error)
  }

  try {
    await place?.save()
  } catch (err) {
    const error = new HttpError("Someting went wrong. Could not delete place")
    return next(error)
  }

  res.status(201).json({ message: "Place delete" })
}

export { getPlaceById, getPlacesUserById, createPlace, updatePlace, deletePlace }
