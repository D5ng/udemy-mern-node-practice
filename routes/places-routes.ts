import { Router } from "express"
import { createPlace, deletePlace, getPlaceById, getPlacesUserById, updatePlace } from "../controllers/places-controllers"

const placeRoutes = Router()

placeRoutes.get("/:pid", getPlaceById)

placeRoutes.get("/user/:uid", getPlacesUserById)

placeRoutes.post("/", createPlace)

placeRoutes.patch("/:pid", updatePlace)

placeRoutes.delete("/:pid", deletePlace)

export default placeRoutes
