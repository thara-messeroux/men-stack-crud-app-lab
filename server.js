// server.js

// 0) Load environment variables
require("dotenv").config();

// 1) Imports
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const session = require("express-session");

// 2) Models
const Movie = require("./models/Movie");

// 3) Controllers (routes files)
const authController = require("./controllers/auth");

// 4) Create app
const app = express();
const PORT = 3000;

// 5) View engine (EJS)
app.set("view engine", "ejs");

// 6) Middleware: read form data (req.body)
app.use(express.urlencoded({ extended: false }));

// 7) Middleware: allow PUT/DELETE from forms via ?_method=
app.use(methodOverride("_method"));

// 8) Middleware: enable sessions (must be BEFORE routes)
app.use(
    session({
        secret: process.env.SESSION_SECRET, // secret for signing the session cookie
        resave: false, // don't resave if nothing changed
        saveUninitialized: false, // don't create empty sessions
    })
);

// 9) Use controllers
app.use("/auth", authController);

// 10) Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
    console.log("✅ Connected to MongoDB");
});

// ======================
// ROUTES
// ======================

// HOME — quick sanity check
app.get("/", (req, res) => {
    res.send("MEN Stack App Running");
});

// ======================
// MOVIES CRUD (I.N.D.U.C.E.S.)
// ======================

// INDEX — list all movies
app.get("/movies", async (req, res) => {
    try {
        const movies = await Movie.find({});
        res.render("movies/index", { movies });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// NEW — show form to create a movie
app.get("/movies/new", (req, res) => {
    res.render("movies/new");
});

// CREATE — save a new movie from the form
app.post("/movies", async (req, res) => {
    try {
        await Movie.create(req.body);
        res.redirect("/movies");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// SHOW — show one movie
app.get("/movies/:id", async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.render("movies/show", { movie });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// EDIT — show form to edit a movie
app.get("/movies/:id/edit", async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.render("movies/edit", { movie });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// UPDATE — update movie in database
app.put("/movies/:id", async (req, res) => {
    try {
        await Movie.findByIdAndUpdate(req.params.id, req.body);
        res.redirect(`/movies/${req.params.id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// DELETE — delete movie from database
app.delete("/movies/:id", async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        res.redirect("/movies");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// ======================
// START SERVER
// ======================
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});