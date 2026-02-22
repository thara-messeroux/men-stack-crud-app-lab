// Import express
const express = require("express");

// Create express app
const app = express();

// Set port
const PORT = 3000;

// Home route
app.get("/", (req, res) => {
    res.send("MEN Stack App Running");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});