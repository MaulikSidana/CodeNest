const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  problemsSolved: {
    easy: { type: Number, default: 0 },
    medium: { type: Number, default: 0 },
    hard: { type: Number, default: 0 }
  },
  lastProblemSolved: {
    type: String,
    default: null,
  },
  solvedProblems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    default: []
  }]
});

const User = mongoose.model("User", userSchema, "users");
module.exports = User;
