import * as express from "express"
import {
  createUser,
  deleteUser,
  getUserById,
  getUserList,
  updateUser,
} from "../services/users"

const users = express()

// Get a list of users
users.get("/user/list", getUserList)

// Get user by id
users.get("/user/:id", getUserById)

// Create user
users.post("/user", createUser)

// Update user
users.patch("/user/:id", updateUser)

// Delete user
users.delete("/user/:id", deleteUser)

export default users
