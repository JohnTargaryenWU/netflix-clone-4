const mongoose = require("mongoose");

// Mongoose Schema for DB
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  likedMovies: Array,
});

module.exports = mongoose.model("users", userSchema);