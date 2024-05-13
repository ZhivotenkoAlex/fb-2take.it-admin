import * as express from "express"
import {
  createCompany,
  deleteCompany,
  getCompanyById,
  getCompanyList,
  getPaginatedCompanyList,
  updateCompany,
} from "../services/company"

const company = express()

// Get a list of companies
company.get("/company/list", getCompanyList)

// Endpoint to get a list of companies
company.get("/company/paginated", getPaginatedCompanyList)

// Get company by id
company.get("/company/:id", getCompanyById)

// Create company
company.post("/company/create", createCompany)

// Update company
company.patch("/company/update/:id", updateCompany)

// Delete company
company.delete("/company/delete/:id", deleteCompany)

export default company
