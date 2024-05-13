import * as functions from "firebase-functions"
import * as express from "express"
import * as admin from "firebase-admin"
import * as cors from "cors"
import { getFirestore } from "firebase-admin/firestore"
import company from "./controllers/company"
// import validateFirebaseIdToken from "./middleware/validateToken"

admin.initializeApp(functions.config().firebase)

export const dbInstance = getFirestore(admin.app(), "admin-test")
// const dbInstance = getFirestore(admin.app()),
dbInstance.settings({ ignoreUndefinedProperties: true })
export const db = dbInstance
const app = express()

app.use(cors())
// app.use(validateFirebaseIdToken)

app.use("/", company)

exports.testAdm = functions.https.onRequest(app)
