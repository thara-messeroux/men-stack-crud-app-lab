// Read .env variables
const dotenv = require("dotenv");
dotenv.config();

// Import tools
const express = require("express");
const mongoose = require("mongoose");

// Create app
const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
    console.log("✅ Connected to MongoDB");
});

// Home route
app.get("/", (req, res) => {
    res.send("MEN Stack App Running");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});