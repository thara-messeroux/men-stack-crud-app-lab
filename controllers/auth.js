const express = require("express");
const router = express.Router();

// GET sign up page
router.get("/sign-up", (req, res) => {
    res.render("auth/sign-up.ejs");
});

// GET sign in page
router.get("/sign-in", (req, res) => {
    res.render("auth/sign-in.ejs");
});

module.exports = router;