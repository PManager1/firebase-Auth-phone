

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

admin.initializeApp();
const app = express();

app.use(cors({ origin: true }));
app.use(express.json()); // To parse JSON bodies

// POST /createUser
app.post("/createUser", async (req, res) => {
  const { email, password, displayName } = req.body;

  if (!email || !password || !displayName) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName,
    });

    return res.status(201).json({ uid: userRecord.uid });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

exports.api = functions.https.onRequest(app);