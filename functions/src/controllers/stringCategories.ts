import * as express from "express"
import {
  createStringCategory,
  deleteStringCategory,
  getStringCategoryById,
  getPaginatedStringCategoryList,
  updateStringCategory,
} from "../services/stringCategories"

const stringCategories = express()

// Get a paginated list of string categories
stringCategories.get("/string-categories", getPaginatedStringCategoryList)

// Get string category by id
stringCategories.get("/string-categories/:id", getStringCategoryById)

// Create string category
stringCategories.post("/string-categories", createStringCategory)

// Update string category
stringCategories.patch("/string-categories/:id", updateStringCategory)

// Delete string category
stringCategories.delete("/string-categories/:id", deleteStringCategory)

export default stringCategories
