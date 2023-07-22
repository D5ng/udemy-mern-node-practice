import { Schema, model } from "mongoose"

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
  creator: string
}

const placeSchema = new Schema<PlaceType>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  creator: { type: String, required: true },
})

const Place = model<PlaceType>("Place", placeSchema)

export default Place
