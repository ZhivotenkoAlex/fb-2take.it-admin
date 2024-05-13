import * as functions from "firebase-functions"
import * as express from "express"
import * as admin from "firebase-admin"
import * as cors from "cors"
import { getFirestore } from "firebase-admin/firestore"
import company from "./controllers/company"
import swagger from "./controllers/swagger"
import fan from "./controllers/fan"
import gamification from "./controllers/gamification"
import gamificationBills from "./controllers/gamificationBills"
import languages from "./controllers/languages"
import personalNumberHistory from "./controllers/personalNumberHistory"
import products from "./controllers/products"
import purchases from "./controllers/purchases"
import stringCategories from "./controllers/stringCategories"
import users from "./controllers/users"

admin.initializeApp(functions.config().firebase)

// export const dbInstance = getFirestore(admin.app(), "admin-test")

export const dbInstance = getFirestore(admin.app(), "skanuj-wygrywaj")
// const dbInstance = getFirestore(admin.app()),
dbInstance.settings({ ignoreUndefinedProperties: true })
export const db = dbInstance
const app = express()
app.use(cors())

// app.use(validateFirebaseIdToken)

app.use(
  "/",
  swagger,
  company,
  fan,
  gamification,
  gamificationBills,
  languages,
  personalNumberHistory,
  products,
  purchases,
  stringCategories,
  users
)

exports.testAdm = functions.https.onRequest(app)
