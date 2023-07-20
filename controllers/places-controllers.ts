import { RequestHandler } from "express"
import HttpError from "../models/httpError"
import { v4 as uuid } from "uuid"
import { validationResult } from "express-validator"

interface PlaceType {
  id: string
  title: string
  description: string
  location: {
    lat: number
    lng: number
  }
  address: string
  creator: string
}

const DUMMY_PLACES: PlaceType[] = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    location: {
      lat: 40.7484474,
      lng: -73.9871516,
    },
    address: "20 W 34th St, New York, NY 10001",
    creator: "u1",
  },
]

const getPlaceById: RequestHandler = (req, res, next) => {
  const placeId = req.params.pid
  const place = DUMMY_PLACES.find((place) => place.id === placeId)
  if (!place) {
    const error = new HttpError("Could not find a places for the provided id.", 404)
    return next(error)
  }

  res.json({ place })
}

const getPlacesUserById: RequestHandler = (req, res, next) => {
  const userId = req.params.uid
  const places = DUMMY_PLACES.filter((place) => place.creator === userId)

  if (!places || places.length === 0) {
    const error = new HttpError("Could not find a place for the provided userId.", 404)
    return next(error)
  }

  res.json({ places })
}

const createPlace: RequestHandler = (req, res) => {
  const error = validationResult(req)

  if (!error.isEmpty()) {
    res.status(422)
    throw new HttpError("Invalid Inputs passed, please check your data", 422)
  }

  const { title, description, coordinates, address, creator } = req.body
  const createdPlace = {
    id: uuid(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  }

  DUMMY_PLACES.push(createdPlace)

  res.status(201).json({ plcae: createdPlace })
}

const updatePlace: RequestHandler = (req, res) => {
  const error = validationResult(req)

  console.log(error.isEmpty())

  if (!error.isEmpty()) {
    res.status(422)
    throw new HttpError("Invalid Inputs passed, please check your data", 422)
  }
  const { title, description } = req.body
  const placeId = req.params.pid
  const updatedPlace = { ...(<PlaceType>DUMMY_PLACES.find((place) => place.id === placeId)) }
  const placeIndex = DUMMY_PLACES.findIndex((place) => place.id === placeId)

  updatedPlace.title = title
  updatedPlace.description = description

  DUMMY_PLACES[placeIndex] = updatedPlace

  res.status(201).json({ place: updatedPlace })
}

const deletePlace: RequestHandler = (req, res) => {
  const placeId = req.params.pid

  if (!DUMMY_PLACES.find((place) => place.id === placeId)) {
    throw new HttpError("Could not find a place for that id.", 404)
  }

  const placeIndex = DUMMY_PLACES.findIndex((place) => place.id === placeId)
  const deletePlace = DUMMY_PLACES[placeIndex]
  DUMMY_PLACES.splice(placeIndex, 1)

  res.status(201).json({ place: DUMMY_PLACES, deletePlace })
}

export { getPlaceById, getPlacesUserById, createPlace, updatePlace, deletePlace }
