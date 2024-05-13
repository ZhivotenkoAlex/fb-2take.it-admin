import * as express from "express"
import {
  createFan,
  deleteFan,
  getFanById,
  getPaginatedFanList,
  updateFan,
} from "../services/fan"

const fan = express()

// Endpoint to get a list of companies
fan.get("/fan", getPaginatedFanList)

// Get fan by id
fan.get("/fan/:id", getFanById)

// Create fan
fan.post("/fan", createFan)

// Update fan
fan.patch("/fan/:id", updateFan)

// Delete fan
fan.delete("/fan/:id", deleteFan)

export default fan
