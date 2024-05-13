import * as express from "express"
import { db } from "../index"
import { CollectionReference, FieldPath } from "firebase-admin/firestore"
import { StringCategories } from "../types/stringCategories"

const collection = "StringCategories"

// Get a list of string categories
export const getStringCategoryList = async (
  _request: express.Request,
  response: express.Response
) => {
  try {
    const query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> =
      db.collection(collection)

    const snapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> =
      await query.get()

    if (snapshot.empty) {
      return response.status(404).send({ data: "No string categories found" })
    } else {
      const stringCategories = snapshot.docs.map((doc) => ({
        _id: doc.id,
        ...doc.data(),
      })) as StringCategories[]
      return response.status(200).send({ data: stringCategories })
    }
  } catch (error) {
    return response
      .status(500)
      .send({ data: "Error retrieving string categories" })
  }
}

// Endpoint to get a list of string categories
export const getPaginatedStringCategoryList = async (
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
    const stringCategories = await query.get().then((res) =>
      res.docs.map((doc) => ({
        // Extract the string category data from the document
        _id: doc.id,
        ...doc.data(),
      }))
    )

    // If no string categories were found, send a 404 response
    if (stringCategories.length === 0) {
      response.status(404).send({ data: "No string categories found" })
    } else {
      // Send the list of string categories to the client
      response.status(200).send({ data: stringCategories })
    }
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      response.status(500).send({ data: error?.message })
    }
  }
}

// Get string category by id
export const getStringCategoryById = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const id = request.params.id

    const snapshot = await db.collection(collection).doc(id).get()

    if (!snapshot.exists) {
      return response.status(404).send({ data: "No string category found" })
    }

    const stringCategory = snapshot.data()

    return response.status(200).send({ data: stringCategory })
  } catch (error) {
    return response
      .status(500)
      .send({ data: "Error retrieving string category" })
  }
}

// Create string category
export const createStringCategory = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const body = request.body as StringCategories
    // Add string category to the database
    const res = await db.collection(collection).add(body)

    return response.status(201).send({
      data: {
        id: res.id,
      },
    })
  } catch (error) {
    return response
      .status(500)
      .send({ data: "String category cannot be created" })
  }
}

// Update string category
export const updateStringCategory = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const id = request.params.id
    const body = request.body

    // Check if string category exists
    const snapshot = await db.collection(collection).doc(id).get()

    if (!snapshot.exists) {
      return response.status(404).send({ data: "No string category found" })
    }

    // Update string category
    await db.collection(collection).doc(id).update(body)

    // Get updated string category
    const updatedSnapshot = await db.collection(collection).doc(id).get()
    const updatedItem = updatedSnapshot.data()

    // Send updated string category to the client
    return response.status(200).send({ data: { updatedItem } })
  } catch (error) {
    return response
      .status(500)
      .send({ data: "String category cannot be updated" })
  }
}

// Delete string category
export const deleteStringCategory = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const id = request.params.id

    // Check if string category exists
    const snapshot = await db.collection(collection).doc(id).get()

    if (!snapshot.exists) {
      return response.status(404).send({ data: "No string category found" })
    }

    // Delete string category
    await db.collection(collection).doc(id).delete()

    // Send response to the client
    return response.status(204).send({ data: "String category was deleted" })
  } catch (error) {
    return response
      .status(500)
      .send({ data: "String category cannot be deleted" })
  }
}
