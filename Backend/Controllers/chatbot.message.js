// chatbot.message.js
const User = require("../models/user.model");
const Bot = require("../models/bot.model");   // <-- don't forget this
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Init AI with API key from .env
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY);

const Message = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "User question is required" });
    }

    // 1️⃣ Save user message
    const newUserMsg = new User({
      sender: "user",
      text: question,
    });
    await newUserMsg.save();

    // 2️⃣ Generate AI response
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(question);

    const botReply =
      result.response.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response.";

    // 3️⃣ Save bot message
    const newBotMsg = new Bot({
      text: botReply,
    });
    await newBotMsg.save();

    // 4️⃣ Return both messages
    res.json({
      user: question,
      bot: botReply,
    });
  } catch (error) {
    console.error("❌ Error in Message controller:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { Message };
