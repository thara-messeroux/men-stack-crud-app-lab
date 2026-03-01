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

// Import controllers
const authController = require("./controllers/auth");

// View engine (EJS pages)
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

// Use controllers
app.use("/auth", authController);

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
    try {
        const movies = await Movie.find({});
        res.render("movies/index", { movies });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// NEW - show form to create a movie
app.get("/movies/new", (req, res) => {
    res.render("movies/new");
});

// CREATE - save a new movie from the form
app.post("/movies", async (req, res) => {
    try {
        await Movie.create(req.body);
        res.redirect("/movies");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// SHOW - show one movie
app.get("/movies/:id", async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.render("movies/show", { movie });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// EDIT - show form to edit a movie
app.get("/movies/:id/edit", async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.render("movies/edit", { movie });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// UPDATE - save edited movie
app.put("/movies/:id", async (req, res) => {
    try {
        await Movie.findByIdAndUpdate(req.params.id, req.body);
        res.redirect(`/movies/${req.params.id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// DELETE - remove a movie
app.delete("/movies/:id", async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        res.redirect("/movies");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

