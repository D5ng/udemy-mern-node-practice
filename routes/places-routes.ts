import { Router } from "express"
import { createPlace, getPlaceById, getPlaceUserById } from "../controllers/places-controllers"

const placeRouter = Router()

placeRouter.get("/:pid", getPlaceById)
placeRouter.get("/user/:uid", getPlaceUserById)
placeRouter.post("/", createPlace)

export default placeRouter
