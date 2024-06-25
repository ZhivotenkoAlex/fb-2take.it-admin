// routes/surveys.js
const express = require("express");
const FirestoreStorage = require("../db-adapters/firestore");

const router = express.Router();
const storage = new FirestoreStorage();

router.get("/getActive", async (req, res) => {
  const result = await storage.getSurveys();
  res.json(result);
});

router.get("/getSurvey", async (req, res) => {
  const { surveyId } = req.query;
  const result = await storage.getSurvey(surveyId);
  res.json(result);
});

router.get("/create", async (req, res) => {
  const { name } = req.query;
  const result = await storage.addSurvey(name);
  res.json(result);
});

router.get("/changeName", async (req, res) => {
  const { id, name } = req.query;
  const result = await storage.changeName(id, name);
  res.json(result);
});

router.get("/delete", async (req, res) => {
  const { id } = req.query;
  const result = await storage.deleteSurvey(id);
  res.json(result);
});

router.post("/changeJson", async (req, res) => {
  const { id, json } = req.body;
  const result = await storage.storeSurvey(id, null, json);
  res.json(result);
});

router.post("/post", async (req, res) => {
  const { postId, surveyResult } = req.body;
  const result = await storage.postResults(postId, surveyResult);
  res.json(result);
});

router.get("/results", async (req, res) => {
  const { postId } = req.query;
  const result = await storage.getResults(postId);
  res.json(result);
});

module.exports = router;
