import * as express from "express"
import { db } from "../index"
import { dateToTimestamp } from "../helpers/timestampToDate"
import { CollectionReference, FieldPath } from "firebase-admin/firestore"
import { Purchase } from "../types/purchase"

const collection = "Purchases"

// Get a list of purchases
export const getPurchaseList = async (
  _request: express.Request,
  response: express.Response
) => {
  try {
    const query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> =
      db.collection(collection)

    const snapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> =
      await query.get()

    if (snapshot.empty) {
      return response.status(404).send({ data: "No purchases found" })
    } else {
      const purchases = snapshot.docs.map((doc) => ({
        _id: doc.id,
        ...doc.data(),
      })) as Purchase[]
      return response.status(200).send({ data: purchases })
    }
  } catch (error) {
    return response.status(500).send({ data: "Error retrieving purchases" })
  }
}

// Endpoint to get a list of purchases
export const getPaginatedPurchaseList = async (
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
    const purchases = await query.get().then((res) =>
      res.docs.map((doc) => ({
        // Extract the purchase data from the document
        _id: doc.id,
        ...doc.data(),
      }))
    )

    // If no purchases were found, send a 404 response
    if (purchases.length === 0) {
      response.status(404).send({ data: "No purchases found" })
    } else {
      // Send the list of purchases to the client
      response.status(200).send({ data: purchases })
    }
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      response.status(500).send({ data: error?.message })
    }
  }
}

// Get purchase by id
export const getPurchaseById = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const id = request.params.id

    const snapshot = await db.collection(collection).doc(id).get()

    if (!snapshot.exists) {
      return response.status(404).send({ data: "No purchase found" })
    }

    const purchase = snapshot.data()

    return response.status(200).send({ data: purchase })
  } catch (error) {
    return response.status(500).send({ data: "Error retrieving purchase" })
  }
}

// Create purchase
export const createPurchase = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const body = request.body as Purchase
    // Add purchase to the database
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
    return response.status(500).send({ data: "Purchase cannot be created" })
  }
}

// Update purchase
export const updatePurchase = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const id = request.params.id
    const body = request.body

    // Check if purchase exists
    const snapshot = await db.collection(collection).doc(id).get()

    if (!snapshot.exists) {
      return response.status(404).send({ data: "No purchase found" })
    }

    if (body.curTime !== undefined) {
      body.curTime = dateToTimestamp(body.curTime as Date)
    }

    // Update purchase
    await db.collection(collection).doc(id).update(body)

    // Get updated purchase
    const updatedSnapshot = await db.collection(collection).doc(id).get()
    const updatedItem = updatedSnapshot.data()

    // Send updated purchase to the client
    return response.status(200).send({ data: { updatedItem } })
  } catch (error) {
    return response.status(500).send({ data: "Purchase cannot be updated" })
  }
}

// Delete purchase
export const deletePurchase = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const id = request.params.id

    // Check if purchase exists
    const snapshot = await db.collection(collection).doc(id).get()

    if (!snapshot.exists) {
      return response.status(404).send({ data: "No purchase found" })
    }

    // Delete purchase
    await db.collection(collection).doc(id).delete()

    // Send response to the client
    return response.status(204).send({ data: "Purchase was deleted" })
  } catch (error) {
    return response.status(500).send({ data: "Purchase cannot be deleted" })
  }
}
