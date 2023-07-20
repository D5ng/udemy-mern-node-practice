import express, { NextFunction, Request, Response, json } from "express"
import placeRouter from "./routes/places"
import CodeError from "./utils/error"

const app = express()

app.use(json())
app.use("/api/places", placeRouter)
app.use((err: CodeError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err)
  }
  res.status(err.code || 500)
  res.json({ message: err.message || "An unknown error occurred", code: err.code })
})

app.listen(4000, () => {
  console.log("listening at PORT", 4000)
})
