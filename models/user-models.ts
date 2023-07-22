import mongoose, { Schema, Types } from "mongoose"
import mongooseUniqueValidator from "mongoose-unique-validator"

interface PlaceType {
  id: string
  title: string
  description: string
  image: string
  location: {
    lat: number
    lng: number
  }
  address: string
  creator: {
    type: Types.ObjectId
  }
}

interface UserType {
  name: string
  email: string
  password: string
  image: string
  places: {
    push(createdPlace: mongoose.Document<unknown, {}, PlaceType> & PlaceType & { _id: Types.ObjectId }): unknown
    type: Types.ObjectId
  }
}

const userSchema = new Schema<UserType>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, requird: true, minlength: 6 },
  image: { type: String, required: true },
  places: [{ type: mongoose.Types.ObjectId, required: true, ref: "Place" }],
})

userSchema.plugin(mongooseUniqueValidator)

const User = mongoose.model<UserType>("User", userSchema)

export default User
