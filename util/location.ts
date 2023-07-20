import axios from "axios"
import HttpError from "../models/httpError"
import "dotenv/config"

const API_KEY = process.env.API_KEY

export default async function getCoordsForAddress(address: string) {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`
  )
  const data = response.data

  if (!data || data.status === "ZERO_RESULTS") {
    throw new HttpError("Could not find location for the specified address", 422)
  }

  const coordinates = data.results[0].geometry.location

  return coordinates
}
