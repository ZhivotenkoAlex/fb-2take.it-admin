// db-adapters/firestore.js
const db = require("../firebaseDb");
const admin = require("firebase-admin");
let currentId = 1;

/**
 * FirestoreStorage class for managing surveys in Firestore.
 */
class FirestoreStorage {
  /**
   * Retrieves all surveys from Firestore.
   * @param {function} callback - The callback function to execute with the survey data.
   */
  async getSurveys() {
    const snapshot = await db.collection("surveys").get();
    // eslint-disable-next-line arrow-parens
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  /**
   * Retrieves a single survey from Firestore.
   * @param {string} id - The ID of the survey to retrieve.
   * @param {function} callback - The callback function to execute with the survey data.
   */
  async getSurvey(id) {
    console.log("🚀 ~ FirestoreStorage ~ getSurvey ~ id:", id)
    const doc = await db.collection("surveys").doc(id).get();
    console.log("🚀 ~ FirestoreStorage ~ getSurvey ~ doc:", doc)
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  }
  /**
   * Adds a new survey to Firestore.
   * @param {string} name - The name of the survey.
   * @param {function} callback - The callback function to execute after adding the survey.
   */
  async addSurvey(name) {
    const newObj = {
      name: name || ("New Survey " + currentId++),
      json: "{}",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await db.collection("surveys").add(newObj);
    const doc = await docRef.get();
    return { id: doc.id, ...doc.data() };
  }
  /**
   * Changes the name of a survey.
   * @param {string} id - The ID of the survey to update.
   * @param {string} name - The new name of the survey.
   * @param {function} callback - The callback function to execute after updating the survey.
   */
  async changeName(id, name) {
    const docRef = db.collection("surveys").doc(id);
    await docRef.update({ name });
    const doc = await docRef.get();
    return { id: doc.id, ...doc.data() };
  }
  /**
   * Deletes a survey from Firestore.
   * @param {string} id - The ID of the survey to delete.
   * @param {function} callback - The callback function to execute after deleting the survey.
   */
  async deleteSurvey(id) {
    await db.collection("surveys").doc(id).delete();
    return { id };
  }
  /**
   * Stores the JSON data of a survey.
   * @param {string} id - The ID of the survey to store.
   * @param {object} _ - The null object.
   * @param {object} json - The JSON data to store.
   * @param {function} callback - The callback function to execute after storing the JSON data.
   */
  async storeSurvey(id, _, json) {
    const docRef = db.collection("surveys").doc(id);
    await docRef.update({ json });
    const doc = await docRef.get();
    return { id: doc.id, ...doc.data() };
  }
  /**
   * Posts survey results.
   * @param {string} postId - The ID of the survey post.
   * @param {object} json - The survey results to store.
   * @param {function} callback - The callback function to execute after storing the results.
   */
  async postResults(postId, json) {
    const newObj = {
      postid: postId,
      json: json,
    };

    const docRef = await db.collection("results").add(newObj);
    const doc = await docRef.get();
    return { id: doc.id, ...doc.data() };
  }
  /**
   * Retrieves survey results.
   * @param {string} postId - The ID of the survey post.
   * @param {function} callback - The callback function to execute with the survey results.
   */
  async getResults(postId) {
    console.log("🚀 ~ FirestoreStorage ~ getResults ~ postId:", postId)
    const snapshot = await db.collection("results").where("json.postid", "==", postId).get();
    if (snapshot.empty) {
      return null;
    }
    // eslint-disable-next-line arrow-parens
    return { id: postId, data: snapshot.docs.map(doc => doc.data().json) };
  }
}

module.exports = FirestoreStorage;
