// controllers/auth.js
const express = require("express");
// Import method-override for PUT and DELETE requests
const router = express.Router();
// Import bcrypt for password hashing
const bcrypt = require("bcrypt");
//  Import User model
const User = require("../models/User");

// GET sign up page
router.get("/sign-up", (req, res) => {
    res.render("auth/sign-up.ejs");
});

// GET sign in page
router.get("/sign-in", (req, res) => {
    res.render("auth/sign-in.ejs");
});

// POST sign up form
router.post("/sign-up", async (req, res) => {
    try {
        const { username, password, confirmPassword } = req.body;

        // 1) confirm password match
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
        req.body.password = hashedPassword;

        // 4) create user
        await User.create(req.body);

        // 5) redirect somewhere (landing page)
        res.redirect("/");
    } catch (err) {
        console.log(err);
        res.send("Something went wrong during sign up");
    }
});

// POST sign in form
 module.exports = router;