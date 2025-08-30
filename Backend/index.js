// index.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();   // ✅ must be declared first

// Middleware
app.use(express.json());  // parse JSON requests
app.use(cors({
  origin: "http://localhost:5178", // your React app port
  methods: ["GET", "POST"],
  credentials: true
}));

// Connect DB
const db = require("./db");

// Routes
const chatbotRoute = require("./routes/chatbot.route");
app.use("/bot/v1", chatbotRoute);

// Default test route
app.get("/", (req, res) => res.send("Hello World!"));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
