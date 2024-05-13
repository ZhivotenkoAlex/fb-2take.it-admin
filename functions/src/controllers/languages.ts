import * as express from "express"
import {
  createLanguage,
  deleteLanguage,
  getLanguageById,
  updateLanguage,
} from "../services/languages"

const language = express()

// Get language by id
language.get("/language/:id", getLanguageById)

// Create language
language.post("/language", createLanguage)

// Update language
language.patch("/language/:id", updateLanguage)

// Delete language
language.delete("/language/:id", deleteLanguage)

export default language
