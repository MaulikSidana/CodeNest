const mongoose = require('mongoose');

const testCaseSchema = new mongoose.Schema(
  {
    input: {
      type: String,
      required: true,
      trim: true
    },
    expected: {
      type: String,
      required: true,
      trim: true
    }
  },
  { _id: false }
);

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true
  },

  interaction: {
    type: String,
    required: true
  },

  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },

  testCases: {
    type: [testCaseSchema],
    required: true,
  },
  constraints:{
    type: [String],
    required: true,
  }
});

const Questions = mongoose.model('Questions', questionSchema);
module.exports = Questions;
