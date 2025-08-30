// models/Bot.js
const mongoose = require("mongoose");

const BotSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now, // <-- fixed
  },
});

const Bot = mongoose.model("Bot", BotSchema);

module.exports = Bot;
