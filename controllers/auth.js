// controllers/auth.js

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");


// GET sign-up page
router.get("/sign-up", (req, res) => {
    res.render("auth/sign-up.ejs");
});

// GET sign-in page
router.get("/sign-in", (req, res) => {
    res.render("auth/sign-in.ejs");
});

// POST sign up form
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

        // 4) create user in DB
        const newUser = await User.create({
            username,
            password: hashedPassword,
        });

        // 5) save user id in session (this is the missing piece)
        req.session.user = newUser._id;

        // 6) redirect after session is set
        res.redirect("/");
    } catch (err) {
        console.log(err);
        res.send("Something went wrong during sign up");
    }
});

// POST sign-in form

module.exports = router;