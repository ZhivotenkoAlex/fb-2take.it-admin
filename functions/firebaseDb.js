
// firebaseDb.js
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const { getFirestore } = require("firebase-admin/firestore")
admin.initializeApp(functions.config().firebase)
const db = getFirestore(admin.app(), "skanuj-wygrywaj")
db.settings({ ignoreUndefinedProperties: true });

module.exports = db;
