// Import mongoose
const mongoose = require("mongoose");

// Create a schema (blueprint for movies)
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    director: {
        type: String,
    },
    year: {
        type: Number,
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
    },
    watched: {
        type: Boolean,
        default: false,
    },
});

// Create model from schema
const Movie = mongoose.model("Movie", movieSchema);

// Export model
module.exports = Movie;