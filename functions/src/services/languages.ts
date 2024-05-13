import * as express from "express"
import { db } from "../index"
import { Language } from "../types/language"

const collection = "languages"

// Get a list of languages
export const getLanguageList = async (
  _request: express.Request,
  response: express.Response
) => {
  try {
    const query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> =
      db.collection(collection)

    const snapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> =
      await query.get()

    if (snapshot.empty) {
      return response.status(404).send({ data: "No languages found" })
    } else {
      const languages = snapshot.docs.map((doc) => ({
        _id: doc.id,
        ...doc.data(),
      })) as Language[]
      return response.status(200).send({ data: languages })
    }
  } catch (error) {
    return response.status(500).send({ data: "Error retrieving languages" })
  }
}

// Get language by id
export const getLanguageById = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const id = request.params.id

    const snapshot = await db.collection(collection).doc(id).get()

    if (!snapshot.exists) {
      return response.status(404).send({ data: "No language found" })
    }

    const language = snapshot.data()

    return response.status(200).send({ data: language })
  } catch (error) {
    return response.status(500).send({ data: "Error retrieving language" })
  }
}

// Create language
export const createLanguage = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const body = request.body as Language
    // Add language to the database

    const res = await db.collection(collection).add(body)

    return response.status(201).send({
      data: {
        id: res.id,
      },
    })
  } catch (error) {
    return response.status(500).send({ data: "Language cannot be created" })
  }
}

// Update language
export const updateLanguage = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const id = request.params.id
    const body = request.body

    // Check if language exists
    const snapshot = await db.collection(collection).doc(id).get()

    if (!snapshot.exists) {
      return response.status(404).send({ data: "No language found" })
    }

    // Update language
    await db.collection(collection).doc(id).update(body)

    // Get updated language
    const updatedSnapshot = await db.collection(collection).doc(id).get()
    const updatedItem = updatedSnapshot.data()

    // Send updated language to the client
    return response.status(200).send({ data: { updatedItem } })
  } catch (error) {
    return response.status(500).send({ data: "Language cannot be updated" })
  }
}

// Delete language
export const deleteLanguage = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const id = request.params.id

    // Check if language exists
    const snapshot = await db.collection(collection).doc(id).get()

    if (!snapshot.exists) {
      return response.status(404).send({ data: "No language found" })
    }

    // Delete language
    await db.collection(collection).doc(id).delete()

    // Send response to the client
    return response.status(204).send({ data: "Language was deleted" })
  } catch (error) {
    return response.status(500).send({ data: "Language cannot be deleted" })
  }
}
