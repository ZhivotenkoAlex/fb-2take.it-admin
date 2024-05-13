import * as express from "express"
import {
  createGamificationBill,
  deleteGamificationBill,
  getGamificationBillById,
  getPaginatedGamificationBillList,
  updateGamificationBill,
} from "../services/gamificationBills"

const gamification_bills = express()

// Get a paginated list of gamification bills
gamification_bills.get("/gamification-bill", getPaginatedGamificationBillList)

// Get gamification bills by id
gamification_bills.get("/gamification-bill/:id", getGamificationBillById)

// Create gamification bills
gamification_bills.post("/gamification-bill", createGamificationBill)

// Update gamification bills
gamification_bills.patch("/gamification-bill/:id", updateGamificationBill)

// Delete gamification bills
gamification_bills.delete("/gamification-bill/:id", deleteGamificationBill)

export default gamification_bills
