import * as express from "express"
import {
  createProduct,
  deleteProduct,
  getProductById,
  getPaginatedProductList,
  updateProduct,
} from "../services/products"

const products = express()

// Get a paginated list of products
products.get("/product", getPaginatedProductList)

// Get product by id
products.get("/product/:id", getProductById)

// Create product
products.post("/product", createProduct)

// Update product
products.patch("/product/:id", updateProduct)

// Delete product
products.delete("/product/:id", deleteProduct)

export default products
