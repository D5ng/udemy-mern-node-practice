import { Router } from "express"
import { getPlaceById, getPlaceUserById } from "../controllers/places-controllers"

const placeRouter = Router()

placeRouter.get("/:pid", getPlaceById)

placeRouter.get("/user/:uid", getPlaceUserById)

export default placeRouter
