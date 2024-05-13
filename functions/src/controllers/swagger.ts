import * as express from "express"
const swagger = express()
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("../swagger/openapi.json")
import * as bodyParser from "body-parser"

swagger.use("/api-docs/", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
swagger.use(bodyParser.json())
swagger.use(bodyParser.urlencoded({ extended: false }))

export default swagger
