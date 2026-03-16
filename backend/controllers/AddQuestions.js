const Questions = require('../models/QuestionsModel');

const addQuestion = async (req,res) => {
  try {
    const { title, description, interaction,difficulty, testCases } = req.body;
    if (!title || !description || !difficulty || !testCases || !interaction) {
      return res.status(400).send('All fields are required');
    }

    const newQuestion = new Questions({
      title,
      description,
      interaction,
      difficulty,
      constraints,
      testCases
    });

    await newQuestion.save();

    res.status(201).json({
      message: 'Question added successfully',
      questionId: newQuestion._id
    });

  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

module.exports = addQuestion;
