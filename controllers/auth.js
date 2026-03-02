// controllers/auth.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

// GET /auth/sign-up
router.get("/sign-up", (req, res) => {
    res.render("auth/sign-up.ejs");
});

// GET /auth/sign-in
router.get("/sign-in", (req, res) => {
    res.render("auth/sign-in.ejs");
});

// POST /auth/sign-up
router.post("/sign-up", async (req, res) => {
    try {
        const { username, password, confirmPassword } = req.body;

        // 1) passwords must match
        if (password !== confirmPassword) {
            return res.send("Password and Confirm Password must match");
        }

        // 2) username must be unique
        const userInDatabase = await User.findOne({ username });
        if (userInDatabase) {
            return res.send("Username already taken");
        }

        // 3) hash password
        const hashedPassword = bcrypt.hashSync(password, 10);

        // 4) create user
        const newUser = await User.create({
            username,
            password: hashedPassword,
        });

        // 5) save user id in session
        req.session.user = newUser._id;

        // 6) go home
        res.redirect("/");
    } catch (err) {
        console.log(err);
        res.send("Something went wrong during sign up");
    }
});

// POST /auth/sign-in
router.post("/sign-in", async (req, res) => {
    try {
        const { username, password } = req.body;

        // 1) find user
        const userInDatabase = await User.findOne({ username });
        if (!userInDatabase) {
            return res.send("Invalid username or password");
        }

        // 2) compare passwords
        const validPassword = bcrypt.compareSync(password, userInDatabase.password);
        if (!validPassword) {
            return res.send("Invalid username or password");
        }

        // 3) save user id in session
        req.session.user = userInDatabase._id;

        // 4) go home
        res.redirect("/");
    } catch (err) {
        console.log(err);
        res.send("Something went wrong during sign in");
    }
});

// GET /auth/sign-out
router.get("/sign-out", (req, res) => {
    // destroy the session completely
    req.session.destroy(() => {
        res.redirect("/");
    });
});

module.exports = router;