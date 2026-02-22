// Read .env variables
const dotenv = require("dotenv");
dotenv.config();

// Import tools
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

// Import Model
const Movie = require("./models/Movie");

// Create app
const app = express();
const PORT = 3000;

// View engine (EJS pages)
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
    console.log("✅ Connected to MongoDB");
});

// Home route
app.get("/", (req, res) => {
    res.send("MEN Stack App Running");
});

// INDEX - show all movies
app.get("/movies", async (req, res) => {
    const movies = await Movie.find({});
    res.render("movies/index", { movies });
});

// NEW - show form to create a movie
app.get("/movies/new", (req, res) => {
    res.render("movies/new");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});