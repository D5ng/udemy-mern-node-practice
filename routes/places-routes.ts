import { Router } from "express"
import { createPlace, deletePlace, getPlacesById, getPlaceUserById, updatePlace } from "../controllers/places-controllers"

const placeRouter = Router()

placeRouter.get("/:pid", getPlacesById)

placeRouter.get("/user/:uid", getPlaceUserById)

placeRouter.post("/", createPlace)

placeRouter.patch("/:pid", updatePlace)

placeRouter.delete("/:pid", deletePlace)

export default placeRouter
