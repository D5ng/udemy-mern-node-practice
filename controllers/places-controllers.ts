import express, { RequestHandler } from "express"
import HttpError from "../models/httpError"

const DUMMY_PLACES = [
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
    const error = new HttpError("Could not find a place for the provided id.", 404)
    return next(error)
  }

  res.json({ place })
}

const getPlaceUserById: RequestHandler = (req, res, next) => {
  const userId = req.params.pid
  const place = DUMMY_PLACES.find((place) => place.creator === userId)
  if (!place) {
    const error = new HttpError("Could not find a place for the provided userId.", 404)
    return next(error)
  }

  res.json({ place })
}

export { getPlaceById, getPlaceUserById }