import * as express from "express"
import {
  createGamification,
  deleteGamification,
  getGamificationById,
  getPaginatedGamificationList,
  updateGamification,
} from "../services/gamification"

const gamifications = express()

// Get a paginated list of gamifications
gamifications.get("/gamification", getPaginatedGamificationList)

// Get gamification by id
gamifications.get("/gamification/:id", getGamificationById)

// Create gamification
gamifications.post("/gamification", createGamification)

// Update gamification
gamifications.patch("/gamification/:id", updateGamification)

// Delete gamification
gamifications.delete("/gamification/:id", deleteGamification)

export default gamifications
