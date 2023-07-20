import { RequestHandler } from "express"
import HttpError from "../models/httpError"
import { v4 as uuid } from "uuid"

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Dongs",
    email: "test@test.com",
    password: "test",
  },
]

const getUsers: RequestHandler = (req, res) => {
  res.json({ uesrs: DUMMY_USERS })
}

const signup: RequestHandler = (req, res, next) => {
  const { name, email, password } = req.body
  const hasUser = DUMMY_USERS.find((user) => user.email === email)

  if (hasUser) {
    throw new HttpError("Could not create user, email already exists", 422)
  }

  const createUser = {
    id: uuid(),
    name,
    email,
    password,
  }

  DUMMY_USERS.push(createUser)

  res.status(201).json({ user: createUser })
}

const login: RequestHandler = (req, res, next) => {
  const { email, password } = req.body
  const identifiedUser = DUMMY_USERS.find((user) => user.email === email && user.password === password)

  console.log(identifiedUser)

  if (!identifiedUser) {
    throw new HttpError("Could not identity user, credentials seem to be wrong", 401)
  }

  res.status(201).json({ message: "Success Login!" })
}

export { getUsers, signup, login }
