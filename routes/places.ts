import { NextFunction, Router, Request, Response } from "express"
import CustomError from "../utils/error"

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

const placeRouter = Router()

placeRouter.get("/:pid", (req: Request, res: Response, next: NextFunction) => {
  const placeId = req.params.pid
  const place = DUMMY_PLACES.find((place) => place.id === placeId)
  if (!place) {
    const error = new CustomError({ code: 404, message: "Could not find a place for the provided id." })
    return next(error)
  }

  res.json({ place })
})

placeRouter.get("/user/:uid", (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.pid
  const place = DUMMY_PLACES.find((place) => place.creator === userId)
  if (!place) {
    const error = new CustomError({ code: 404, message: "Could not find a place for the provided userId." })
    return next(error)
  }

  res.json({ place })
})

export default placeRouter
