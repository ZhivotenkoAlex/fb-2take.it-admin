import * as express from "express"
import { db } from "../index"
import { CollectionReference, FieldPath } from "firebase-admin/firestore"
import { Fan } from "../types/fans"

const collection = "fans"

// Get a list of fans
export const getFanList = async (
  _request: express.Request,
  response: express.Response
) => {
  try {
    const query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> =
      db.collection(collection)

    const snapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> =
      await query.get()

    if (snapshot.empty) {
      return response.status(404).send({ data: "No fans found" })
    } else {
      const fans = snapshot.docs.map((doc) => ({
        _id: doc.id,
        ...doc.data(),
      })) as Fan[]
      return response.status(200).send({ data: fans })
    }
  } catch (error) {
    return response.status(500).send({ data: "Error retrieving fans" })
  }
}

// Endpoint to get a list of fans
export const getPaginatedFanList = async (
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
    const fans = await query.get().then((res) =>
      res.docs.map((doc) => ({
        // Extract the fan data from the document
        _id: doc.id,
        ...doc.data(),
      }))
    )

    // If no fans were found, send a 404 response
    if (fans.length === 0) {
      response.status(404).send({ data: "No fans found" })
    } else {
      // Send the list of fans to the client
      response.status(200).send({ data: fans })
    }
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      response.status(500).send({ data: error?.message })
    }
  }
}

// Get fan by id
export const getFanById = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const id = request.params.id

    const snapshot = await db.collection(collection).doc(id).get()

    if (!snapshot.exists) {
      return response.status(404).send({ data: "No fan found" })
    }

    const fan = snapshot.data()

    return response.status(200).send({ data: fan })
  } catch (error) {
    return response.status(500).send({ data: "Error retrieving fan" })
  }
}

// Create fan
export const createFan = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const body = request.body as Fan
    // Add fan to the database

    const res = await db.collection(collection).add(body)

    return response.status(201).send({
      data: {
        id: res.id,
      },
    })
  } catch (error) {
    return response.status(500).send({ data: "Fan cannot be created" })
  }
}

// Update fan
export const updateFan = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const id = request.params.id
    const body = request.body

    // Check if fan exists
    const snapshot = await db.collection(collection).doc(id).get()

    if (!snapshot.exists) {
      return response.status(404).send({ data: "No fan found" })
    }

    // Update fan
    await db.collection(collection).doc(id).update(body)

    // Get updated fan
    const updatedSnapshot = await db.collection(collection).doc(id).get()
    const updatedItem = updatedSnapshot.data()

    // Send updated fan to the client
    return response.status(200).send({ data: { updatedItem } })
  } catch (error) {
    return response.status(500).send({ data: "Fan cannot be updated" })
  }
}

// Delete fan
export const deleteFan = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const id = request.params.id

    // Check if fan exists
    const snapshot = await db.collection(collection).doc(id).get()

    if (!snapshot.exists) {
      return response.status(404).send({ data: "No fan found" })
    }

    // Delete fan
    await db.collection(collection).doc(id).delete()

    // Send response to the client
    return response.status(204).send({ data: "Fan was deleted" })
  } catch (error) {
    return response.status(500).send({ data: "Fan cannot be deleted" })
  }
}
