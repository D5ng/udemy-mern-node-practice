import { Schema, model } from "mongoose"
import mongooseUniqueValidator from "mongoose-unique-validator"

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, requird: true, minlength: 6 },
  image: { type: String, required: true },
  places: { type: String, required: true },
})

userSchema.plugin(mongooseUniqueValidator)

const userModel = model("User", userSchema)

export default userModel
