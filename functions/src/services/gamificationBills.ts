import * as express from "express"
import { db } from "../index"
import { CollectionReference, FieldPath } from "firebase-admin/firestore"
import { GamificationBill } from "../types/gamificationBills"

const collection = "gamification_bills"

// Get a list of gamification bills
export const getGamificationBillList = async (
  _request: express.Request,
  response: express.Response
) => {
  try {
    const query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> =
      db.collection(collection)

    const snapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> =
      await query.get()

    if (snapshot.empty) {
      return response.status(404).send({ data: "No gamification bills found" })
    } else {
      const gamificationBills = snapshot.docs.map((doc) => ({
        _id: doc.id,
        ...doc.data(),
      })) as GamificationBill[]
      return response.status(200).send({ data: gamificationBills })
    }
  } catch (error) {
    return response
      .status(500)
      .send({ data: "Error retrieving gamification bills" })
  }
}

// Endpoint to get a list of gamification bills
export const getPaginatedGamificationBillList = async (
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
    const gamificationBills = await query.get().then((res) =>
      res.docs.map((doc) => ({
        // Extract the gamification bill data from the document
        _id: doc.id,
        ...doc.data(),
      }))
    )

    // If no gamification bills were found, send a 404 response
    if (gamificationBills.length === 0) {
      response.status(404).send({ data: "No gamification bills found" })
    } else {
      // Send the list of gamification bills to the client
      response.status(200).send({ data: gamificationBills })
    }
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      response.status(500).send({ data: error?.message })
    }
  }
}

// Get gamification bill by id
export const getGamificationBillById = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const id = request.params.id

    const snapshot = await db.collection(collection).doc(id).get()

    if (!snapshot.exists) {
      return response.status(404).send({ data: "No gamification bill found" })
    }

    const gamificationBill = snapshot.data()

    return response.status(200).send({ data: gamificationBill })
  } catch (error) {
    return response
      .status(500)
      .send({ data: "Error retrieving gamification bill" })
  }
}

// Create gamification bill
export const createGamificationBill = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const body = request.body as GamificationBill
    // Add gamification bill to the database

    const res = await db.collection(collection).add(body)

    return response.status(201).send({
      data: {
        id: res.id,
      },
    })
  } catch (error) {
    return response
      .status(500)
      .send({ data: "Gamification bill cannot be created" })
  }
}

// Update gamification bill
export const updateGamificationBill = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const id = request.params.id
    const body = request.body

    // Check if gamification bill exists
    const snapshot = await db.collection(collection).doc(id).get()

    if (!snapshot.exists) {
      return response.status(404).send({ data: "No gamification bill found" })
    }

    // Update gamification bill
    await db.collection(collection).doc(id).update(body)

    // Get updated gamification bill
    const updatedSnapshot = await db.collection(collection).doc(id).get()
    const updatedItem = updatedSnapshot.data()

    // Send updated gamification bill to the client
    return response.status(200).send({ data: { updatedItem } })
  } catch (error) {
    return response
      .status(500)
      .send({ data: "Gamification bill cannot be updated" })
  }
}

// Delete gamification bill
export const deleteGamificationBill = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const id = request.params.id

    // Check if gamification bill exists
    const snapshot = await db.collection(collection).doc(id).get()

    if (!snapshot.exists) {
      return response.status(404).send({ data: "No gamification bill found" })
    }

    // Delete gamification bill
    await db.collection(collection).doc(id).delete()

    // Send response to the client
    return response.status(204).send({ data: "Gamification bill was deleted" })
  } catch (error) {
    return response
      .status(500)
      .send({ data: "Gamification bill cannot be deleted" })
  }
}
