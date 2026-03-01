// models/User.js
const mongoose = require("mongoose");

// Create user schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
});

// Create user model
const User = mongoose.model("User", userSchema);

// Export user model
module.exports = User;

