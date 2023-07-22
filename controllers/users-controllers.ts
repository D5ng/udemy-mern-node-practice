import { RequestHandler } from "express"
import HttpError from "../models/httpError"
import { v4 as uuid } from "uuid"
import { validationResult } from "express-validator"
import User from "../models/user-models"

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Dongs",
    email: "test@test.com",
    password: "test",
  },
]

const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await User.find({}, "-password")
    res.json({ uesrs: users.map((user) => user.toObject({ getters: true })) })
  } catch (err) {
    const error = new HttpError("Fetching users failed. please try again leter", 500)
    return next(error)
  }
}

const signup: RequestHandler = async (req, res, next) => {
  const error = validationResult(req)

  if (!error.isEmpty()) {
    const error = new HttpError("Invalid Inputs passed, please check your data", 422)
    return next(error)
  }

  const { name, email, password } = req.body

  let existingUser

  try {
    existingUser = await User.findOne({ email })
  } catch (err) {
    const error = new HttpError("Signing up failed. please try again later.")
    return next(error)
  }

  if (existingUser) {
    const error = new HttpError("User exists alredy, please login instead", 422)
    return next(error)
  }

  const createdUser = new User({
    name,
    email,
    password,
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  })

  console.log(createdUser)

  try {
    await createdUser.save()
  } catch (err) {
    const error = new HttpError("Signing up failed")
    return next(error)
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) })
}

const login: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body

  let existingUser

  try {
    existingUser = await User.findOne({ email, password }).exec()
  } catch (err) {
    const error = new HttpError("Logging in failed, Please try again", 500)
    return next(error)
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError("Invalid credentials, could not log you in", 401)
    return next(error)
  }

  res.status(201).json({ message: "Success Login!" })
}

export { getUsers, signup, login }
