import { Router } from "express"
import { createPlace, deletePlace, getPlaceById, getPlacesUserById, updatePlace } from "../controllers/places-controllers"
import { check } from "express-validator"

const placeRoutes = Router()

placeRoutes.get("/:pid", getPlaceById)

placeRoutes.get("/user/:uid", getPlacesUserById)

placeRoutes.post(
  "/",
  check("title").not().isEmpty(),
  check("description").isLength({ min: 5 }),
  check("address").not().isEmpty(),
  createPlace
)

placeRoutes.patch("/:pid", [check("title").not().isEmpty(), check("description").isLength({ min: 5 })], updatePlace)

placeRoutes.delete("/:pid", deletePlace)

export default placeRoutes
