// chatbot.route.js
const express = require("express");
const router = express.Router();
const { Message } = require("../Controllers/chatbot.message");  // destructure

router.post("/message", Message);

module.exports = router;
