import * as express from "express"
import { db } from "../index"
import { dateToTimestamp } from "../helpers/timestampToDate"
import { Company } from "../types/company"

const company = express()

const collection = "company"

// Get a list of companies
company.get("/company/list", async (request, response) => {
  try {
    const { companyName, profileId, startDate, endDate } = request.query

    const query = db.collection(collection)

    if (companyName && companyName !== "null" && companyName !== "") {
      query.where("name", "==", companyName)
    }

    if (profileId && profileId !== "") {
      query.where("id", "==", profileId)
    }

    if (startDate && startDate !== "null" && startDate !== "") {
      const start = new Date(startDate as string).toISOString()
      query.where("created_time", ">=", start)
    }

    if (endDate && endDate !== "null" && endDate !== "") {
      const end = new Date(endDate as string).toISOString()
      query.where("created_time", "<=", end)
    }

    const snapshot = await query.get()

    if (snapshot.empty) {
      return response.status(404).send({ data: "No companies found" })
    } else {
      const companies = snapshot.docs.map((doc) => ({
        _id: doc.id,
        ...doc.data(),
      }))
      return response.status(200).send({ data: companies })
    }
  } catch (error) {
    return response.status(500).send({ data: "Error retrieving companies" })
  }
})

// Get company by id
company.get("/company/:id", async (request, response) => {
  try {
    const id = request.params.id

    const snapshot = await db.collection(collection).doc(id).get()

    if (!snapshot.exists) {
      return response.status(404).send({ data: "No company found" })
    }

    const company = snapshot.data()

    return response.status(200).send({ data: company })
  } catch (error) {
    return response.status(500).send({ data: "Error retrieving company" })
  }
})

// Create company
company.post("/company/create", async (request, response) => {
  try {
    const body = request.body as Company
    // Add company to the database

    if (body.created_time !== undefined) {
      body.created_time = dateToTimestamp(body.created_time as Date)
    }

    if (body.made_full_time !== undefined) {
      body.made_full_time = dateToTimestamp(body.made_full_time as Date)
    }

    if (body.modified_time !== undefined) {
      body.modified_time = dateToTimestamp(body.modified_time as Date)
    }

    const res = await db.collection(collection).add(body)

    return response.status(201).send({
      data: {
        id: res.id,
      },
    })
  } catch (error) {
    return response.status(500).send({ data: "Company cannot be created" })
  }
})

// Update company
company.patch("/company/update/:id", async (request, response) => {
  try {
    const id = request.params.id
    const body = request.body

    // Check if company exists
    const snapshot = await db.collection(collection).doc(id).get()

    if (!snapshot.exists) {
      return response.status(404).send({ data: "No company found" })
    }

    if (body.created_time !== undefined) {
      body.created_time = dateToTimestamp(body.created_time as Date)
    }

    if (body.created_time !== undefined) {
      body.created_time = dateToTimestamp(body.created_time as Date)
    }

    // Update company
    await db.collection(collection).doc(id).update(body)

    // Get updated company
    const updatedSnapshot = await db.collection(collection).doc(id).get()
    const updatedItem = updatedSnapshot.data()

    // Send updated company to the client
    return response.status(200).send({ data: { updatedItem } })
  } catch (error) {
    return response.status(500).send({ data: "Company cannot be updated" })
  }
})

// Delete company
company.delete("/company/delete/:id", async (request, response) => {
  try {
    const id = request.params.id

    // Check if company exists
    const snapshot = await db.collection(collection).doc(id).get()

    if (!snapshot.exists) {
      return response.status(404).send({ data: "No company found" })
    }

    // Delete company
    await db.collection(collection).doc(id).delete()

    // Send response to the client
    return response.status(204).send({ data: "Company was deleted" })
  } catch (error) {
    return response.status(500).send({ data: "Company cannot be deleted" })
  }
})

export default company