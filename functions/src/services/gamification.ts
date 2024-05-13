import * as express from "express"
import { db } from "../index"
import { CollectionReference, FieldPath } from "firebase-admin/firestore"
import { Gamification } from "../types/gamification"

const collection = "gamification"

// Get a list of gamifications
export const getGamificationList = async (
  _request: express.Request,
  response: express.Response
) => {
  try {
    const query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> =
      db.collection(collection)

    const snapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> =
      await query.get()

    if (snapshot.empty) {
      return response.status(404).send({ data: "No gamifications found" })
    } else {
      const gamifications = snapshot.docs.map((doc) => ({
        _id: doc.id,
        ...doc.data(),
      })) as Gamification[]
      return response.status(200).send({ data: gamifications })
    }
  } catch (error) {
    return response.status(500).send({ data: "Error retrieving gamifications" })
  }
}

// Endpoint to get a list of gamifications
export const getPaginatedGamificationList = async (
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
    const gamifications = await query.get().then((res) =>
      res.docs.map((doc) => ({
        // Extract the gamification data from the document
        _id: doc.id,
        ...doc.data(),
      }))
    )

    // If no gamifications were found, send a 404 response
    if (gamifications.length === 0) {
      response.status(404).send({ data: "No gamifications found" })
    } else {
      // Send the list of gamifications to the client
      response.status(200).send({ data: gamifications })
    }
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      response.status(500).send({ data: error?.message })
    }
  }
}

// Get gamification by id
export const getGamificationById = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const id = request.params.id

    const snapshot = await db.collection(collection).doc(id).get()

    if (!snapshot.exists) {
      return response.status(404).send({ data: "No gamification found" })
    }

    const gamification = snapshot.data()

    return response.status(200).send({ data: gamification })
  } catch (error) {
    return response.status(500).send({ data: "Error retrieving gamification" })
  }
}

// Create gamification
export const createGamification = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const body = request.body as Gamification
    // Add gamification to the database

    const res = await db.collection(collection).add(body)

    return response.status(201).send({
      data: {
        id: res.id,
      },
    })
  } catch (error) {
    return response.status(500).send({ data: "Gamification cannot be created" })
  }
}

// Update gamification
export const updateGamification = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const id = request.params.id
    const body = request.body

    // Check if gamification exists
    const snapshot = await db.collection(collection).doc(id).get()

    if (!snapshot.exists) {
      return response.status(404).send({ data: "No gamification found" })
    }

    // Update gamification
    await db.collection(collection).doc(id).update(body)

    // Get updated gamification
    const updatedSnapshot = await db.collection(collection).doc(id).get()
    const updatedItem = updatedSnapshot.data()

    // Send updated gamification to the client
    return response.status(200).send({ data: { updatedItem } })
  } catch (error) {
    return response.status(500).send({ data: "Gamification cannot be updated" })
  }
}

// Delete gamification
export const deleteGamification = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const id = request.params.id

    // Check if gamification exists
    const snapshot = await db.collection(collection).doc(id).get()

    if (!snapshot.exists) {
      return response.status(404).send({ data: "No gamification found" })
    }

    // Delete gamification
    await db.collection(collection).doc(id).delete()

    // Send response to the client
    return response.status(204).send({ data: "Gamification was deleted" })
  } catch (error) {
    return response.status(500).send({ data: "Gamification cannot be deleted" })
  }
}
