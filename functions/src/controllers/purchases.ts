import * as express from "express"
import {
  createPurchase,
  deletePurchase,
  getPurchaseById,
  getPaginatedPurchaseList,
  updatePurchase,
} from "../services/purchases"

const purchases = express()

// Get a paginated list of purchases
purchases.get("/purchase", getPaginatedPurchaseList)

// Get purchase by id
purchases.get("/purchase/:id", getPurchaseById)

// Create purchase
purchases.post("/purchase", createPurchase)

// Update purchase
purchases.patch("/purchase/:id", updatePurchase)

// Delete purchase
purchases.delete("/purchase/:id", deletePurchase)

export default purchases
