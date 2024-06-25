// index.js
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const surveysRoute = require("./routes/surveys");
const functions = require("firebase-functions");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(session({ secret: "mysecret", resave: true, saveUninitialized: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(surveysRoute);

exports.surveys = functions.https.onRequest(app);