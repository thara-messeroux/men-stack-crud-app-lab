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
const User = require("./models/User"); // 

// 3) Controllers (routes files)
const authController = require("./controllers/auth");

// 4) Middleware
const isSignedIn = require("./middleware/is-signed-in");

// 5) Create app
const app = express();
const PORT = 3000;

// 6) View engine (EJS)
app.set("view engine", "ejs");

// 7) Middleware: read form data (req.body)
app.use(express.urlencoded({ extended: false }));

// 8) Middleware: allow PUT/DELETE from forms via ?_method=
app.use(methodOverride("_method"));

// 9) Middleware: enable sessions (must be BEFORE routes)
app.use(
    session({
        secret: process.env.SESSION_SECRET, // secret for signing the session cookie
        resave: false, // don't resave if nothing changed
        saveUninitialized: false, // don't create empty sessions
    })
);

// 10) Make session user available in all views (res.locals.user)
app.use(async (req, res, next) => { // (fixed: no nesting app.use inside app.use)
    try { // (added try/catch so errors don't crash the server)
        if (req.session.user) {
            const foundUser = await User.findById(req.session.user);
            res.locals.user = foundUser;
        } else {
            res.locals.user = null;
        }
        next();
    } catch (err) {
        console.log(err);
        res.locals.user = null;
        next();
    }
});

// 11) Use controllers
app.use("/auth", authController);

// 12) Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
    console.log("✅ Connected to MongoDB");
});

// ======================
// ROUTES
// ======================

// HOME — renders views/index.ejs
app.get("/", (req, res) => {
    res.render("index");
});

// ======================
// MOVIES CRUD (I.N.D.U.C.E.S.)
// ======================

// INDEX — list all movies
app.get("/movies", isSignedIn, async (req, res) => {
    try {
        const movies = await Movie.find({});
        res.render("movies/index", { movies });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// NEW — show form to create a movie
app.get("/movies/new", isSignedIn, (req, res) => {
    res.render("movies/new");
});

// CREATE — save a new movie from the form
app.post("/movies", isSignedIn, async (req, res) => {
    try {
        await Movie.create(req.body);
        res.redirect("/movies");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// SHOW — show one movie
app.get("/movies/:id", isSignedIn, async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.render("movies/show", { movie });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// EDIT — show form to edit a movie
app.get("/movies/:id/edit", isSignedIn, async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.render("movies/edit", { movie });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// UPDATE — update movie in database
app.put("/movies/:id", isSignedIn, async (req, res) => {
    try {
        await Movie.findByIdAndUpdate(req.params.id, req.body);
        res.redirect(`/movies/${req.params.id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// DELETE — delete movie from database
app.delete("/movies/:id", isSignedIn, async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        res.redirect("/movies");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// Debug route (optional) — remove when done
// (uncomment if you want it back)
// app.get("/debug-session", (req, res) => {
//   res.send(req.session);
// });

// ======================
// START SERVER
// ======================
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});

























