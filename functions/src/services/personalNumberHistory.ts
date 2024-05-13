import * as express from "express"
import { db } from "../index"
import { CollectionReference, FieldPath } from "firebase-admin/firestore"
import { PersonalNumberHistory } from "../types/personalNumberHistory"

const collection = "personal-number-history"

// Get a list of personal number history
export const getPersonalNumberHistoryList = async (
  _request: express.Request,
  response: express.Response
) => {
  try {
    const query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> =
      db.collection(collection)

    const snapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> =
      await query.get()

    if (snapshot.empty) {
      return response
        .status(404)
        .send({ data: "No personal number history found" })
    } else {
      const personalNumberHistory = snapshot.docs.map((doc) => ({
        _id: doc.id,
        ...doc.data(),
      })) as PersonalNumberHistory[]
      return response.status(200).send({ data: personalNumberHistory })
    }
  } catch (error) {
    return response
      .status(500)
      .send({ data: "Error retrieving personal number history " })
  }
}

// Endpoint to get a list of personal number history
export const getPaginatedPersonalNumberHistoryList = async (
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
    const personalNumberHistory = await query.get().then((res) =>
      res.docs.map((doc) => ({
        // Extract the personal number history data from the document
        _id: doc.id,
        ...doc.data(),
      }))
    )

    // If no personal number history were found, send a 404 response
    if (personalNumberHistory.length === 0) {
      response.status(404).send({ data: "No personal number history found" })
    } else {
      // Send the list of personal number history to the client
      response.status(200).send({ data: personalNumberHistory })
    }
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      response.status(500).send({ data: error?.message })
    }
  }
}

// Get personal number history by id
export const getPersonalNumberHistoryById = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const id = request.params.id

    const snapshot = await db.collection(collection).doc(id).get()

    if (!snapshot.exists) {
      return response
        .status(404)
        .send({ data: "No personal number history found" })
    }

    const personalNumberHistory = snapshot.data()

    return response.status(200).send({ data: personalNumberHistory })
  } catch (error) {
    return response
      .status(500)
      .send({ data: "Error retrieving personal number history " })
  }
}

// Create personal number history
export const createPersonalNumberHistory = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const body = request.body as PersonalNumberHistory
    // Add personal number history to the database

    const res = await db.collection(collection).add(body)

    return response.status(201).send({
      data: {
        id: res.id,
      },
    })
  } catch (error) {
    return response
      .status(500)
      .send({ data: "Personal number history cannot be created" })
  }
}

// Update personal number history
export const updatePersonalNumberHistory = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const id = request.params.id
    const body = request.body

    // Check if personal number history exists
    const snapshot = await db.collection(collection).doc(id).get()

    if (!snapshot.exists) {
      return response
        .status(404)
        .send({ data: "No personal number history found" })
    }

    // Update personal number history
    await db.collection(collection).doc(id).update(body)

    // Get updated personal number history
    const updatedSnapshot = await db.collection(collection).doc(id).get()
    const updatedItem = updatedSnapshot.data()

    // Send updated personal number history to the client
    return response.status(200).send({ data: { updatedItem } })
  } catch (error) {
    return response
      .status(500)
      .send({ data: "Personal number history cannot be updated" })
  }
}

// Delete personal number history
export const deletePersonalNumberHistory = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const id = request.params.id

    // Check if personal number history exists
    const snapshot = await db.collection(collection).doc(id).get()

    if (!snapshot.exists) {
      return response
        .status(404)
        .send({ data: "No personal number history found" })
    }

    // Delete personal number history
    await db.collection(collection).doc(id).delete()

    // Send response to the client
    return response
      .status(204)
      .send({ data: "Personal number history was deleted" })
  } catch (error) {
    return response
      .status(500)
      .send({ data: "Personal number history cannot be deleted" })
  }
}
