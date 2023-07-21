import express, { NextFunction, Request, RequestHandler, Response, json } from "express"
import placeRoutes from "./routes/places-routes"
import HttpError from "./models/httpError"
import usersRoutes from "./routes/users-routes"
import mongoose from "mongoose"
import "dotenv/config"

const app = express()
const MONGO_API_KEY = process.env.MONGO_API_KEY! as string

app.use(json())

app.use("/api/places", placeRoutes)
app.use("/api/users", usersRoutes)

app.use<RequestHandler>((req, res, next) => {
  const error = new HttpError("Could not find this route", 404)
  throw error
})

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err)
  }
  res.status(err.errorCode || 500)
  res.json({ message: err.message || "An unknown error occurred", code: err.errorCode })
})

mongoose
  .connect(MONGO_API_KEY)
  .then(() => app.listen(4000, () => console.log("listening at PORT, MongoDB Connect", 4000)))
  .catch((err) => console.log(err))
