import * as express from "express"
import { db } from "../index"
import { dateToTimestamp } from "../helpers/timestampToDate"
import { CollectionReference, FieldPath } from "firebase-admin/firestore"
import { Purchase } from "../types/purchase"

const collection = "Users"

// Get a list of users
export const getUserList = async (
  _request: express.Request,
  response: express.Response
) => {
  try {
    const query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> =
      db.collection(collection)

    const snapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> =
      await query.get()

    if (snapshot.empty) {
      return response.status(404).send({ data: "No users found" })
    } else {
      const users = snapshot.docs.map((doc) => ({
        _id: doc.id,
        ...doc.data(),
      })) as Purchase[]
      return response.status(200).send({ data: users })
    }
  } catch (error) {
    return response.status(500).send({ data: "Error retrieving users" })
  }
}

// Endpoint to get a list of users
export const getPaginatedUserList = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    // Extract query parameters from the request
    const { lastId, firstId, toNext } = request.query

    const limit = 10

    // Initialize the query
    let query = db.collection(collection).orderBy(FieldPath.documentId())

    // Apply pagination to the query
    if (toNext == "null") {
      // Initial and filter query
      query = query.limit(
        limit
      ) as CollectionReference<FirebaseFirestore.DocumentData>
    }

    if (toNext === "true" && lastId !== "" && lastId !== "null") {
      // Next button query
      query = query
        .startAfter(lastId)
        .limit(limit) as CollectionReference<FirebaseFirestore.DocumentData>
    } else if (toNext === "false" && firstId !== "" && firstId !== "null") {
      // Previous button query
      query = query
        .endBefore(firstId)
        .limitToLast(
          limit
        ) as CollectionReference<FirebaseFirestore.DocumentData>
    }

    // Execute the query
    const users = await query.get().then((res) =>
      res.docs.map((doc) => ({
        // Extract the user data from the document
        _id: doc.id,
        ...doc.data(),
      }))
    )

    // If no users were found, send a 404 response
    if (users.length === 0) {
      response.status(404).send({ data: "No users found" })
    } else {
      // Send the list of users to the client
      response.status(200).send({ data: users })
    }
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      response.status(500).send({ data: error?.message })
    }
  }
}

// Get user by id
export const getUserById = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const id = request.params.id

    const snapshot = await db.collection(collection).doc(id).get()

    if (!snapshot.exists) {
      return response.status(404).send({ data: "No user found" })
    }

    const user = snapshot.data()

    return response.status(200).send({ data: user })
  } catch (error) {
    return response.status(500).send({ data: "Error retrieving user" })
  }
}

// Create user
export const createUser = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const body = request.body as Purchase
    // Add user to the database
    if (body.curTime !== undefined) {
      body.curTime = dateToTimestamp(body.curTime as Date)
    }

    const res = await db.collection(collection).add(body)

    return response.status(201).send({
      data: {
        id: res.id,
      },
    })
  } catch (error) {
    return response.status(500).send({ data: "User cannot be created" })
  }
}

// Update user
export const updateUser = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const id = request.params.id
    const body = request.body

    // Check if user exists
    const snapshot = await db.collection(collection).doc(id).get()

    if (!snapshot.exists) {
      return response.status(404).send({ data: "No user found" })
    }

    if (body.curTime !== undefined) {
      body.curTime = dateToTimestamp(body.curTime as Date)
    }

    // Update user
    await db.collection(collection).doc(id).update(body)

    // Get updated user
    const updatedSnapshot = await db.collection(collection).doc(id).get()
    const updatedItem = updatedSnapshot.data()

    // Send updated user to the client
    return response.status(200).send({ data: { updatedItem } })
  } catch (error) {
    return response.status(500).send({ data: "User cannot be updated" })
  }
}

// Delete user
export const deleteUser = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const id = request.params.id

    // Check if user exists
    const snapshot = await db.collection(collection).doc(id).get()

    if (!snapshot.exists) {
      return response.status(404).send({ data: "No user found" })
    }

    // Delete user
    await db.collection(collection).doc(id).delete()

    // Send response to the client
    return response.status(204).send({ data: "User was deleted" })
  } catch (error) {
    return response.status(500).send({ data: "User cannot be deleted" })
  }
}
