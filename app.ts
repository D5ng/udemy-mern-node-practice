import express, { NextFunction, Request, RequestHandler, Response, json } from "express"
import placeRouter from "./routes/places-routes"
import HttpError from "./models/httpError"

const app = express()

app.use(json())

app.use("/api/places", placeRouter)

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

app.listen(4000, () => {
  console.log("listening at PORT", 4000)
})
