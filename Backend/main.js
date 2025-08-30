// // controllers/chatbot.message.js
// const { GoogleGenerativeAI } = require("@google/generative-ai");
// require("dotenv").config();

// // init AI
// const ai = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY);

// // helper function
// async function getAIResponse(prompt) {
//   const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
//   const result = await model.generateContent(prompt);
//   return result.response.text();
// }

// // controller
// const Message = async (req, res) => {
//   try {
//     const { text } = req.body;
//     if (!text) {
//       return res.status(400).json({ error: "Text is required" });
//     }

//     // Save user message
//     const User = require("../models/User");
//     await User.create({ sender: "user", text });

//     // Get AI response
//     const reply = await getAIResponse(text);

//     // Save bot message
//     const Bot = require("../models/Bot");
//     await Bot.create({ text: reply });

//     // Send back reply
//     res.status(200).json({ reply });
//   } catch (err) {
//     console.error("❌ Error in Message controller:", err);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// };

// module.exports = { Message };
