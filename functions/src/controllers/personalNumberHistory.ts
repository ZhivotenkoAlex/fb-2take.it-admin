import * as express from "express"
import {
  createPersonalNumberHistory,
  deletePersonalNumberHistory,
  getPersonalNumberHistoryById,
  getPersonalNumberHistoryList,
  updatePersonalNumberHistory,
} from "../services/personalNumberHistory"

const personalNumberHistory = express()

// Get a list of personal number history
personalNumberHistory.get(
  "/personal-number-history/list",
  getPersonalNumberHistoryList
)

// Get personal number history by id
personalNumberHistory.get(
  "/personal-number-history/:id",
  getPersonalNumberHistoryById
)

// Create personal number history
personalNumberHistory.post(
  "/personal-number-history",
  createPersonalNumberHistory
)

// Update personal number history
personalNumberHistory.patch(
  "/personal-number-history/:id",
  updatePersonalNumberHistory
)

// Delete personal number history
personalNumberHistory.delete(
  "/personal-number-history/:id",
  deletePersonalNumberHistory
)

export default personalNumberHistory
