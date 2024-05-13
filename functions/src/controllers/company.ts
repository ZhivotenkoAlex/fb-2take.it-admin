import * as express from "express"
import {
  createCompany,
  deleteCompany,
  getCompanyById,
  getPaginatedCompanyList,
  updateCompany,
} from "../services/company"

const company = express()

// Endpoint to get a list of companies
company.get("/company", getPaginatedCompanyList)

// Get company by id
company.get("/company/:id", getCompanyById)

// Create company
company.post("/company", createCompany)

// Update company
company.patch("/company/:id", updateCompany)

// Delete company
company.delete("/company/:id", deleteCompany)

export default company
