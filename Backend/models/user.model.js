// models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
    enum: ["user"], // restricts sender to only "user"
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now, // <-- fixed (no parentheses)
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
