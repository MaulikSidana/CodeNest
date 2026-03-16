const mongoose = require('mongoose');
const Questions = require('../models/QuestionsModel');
async function updateQuestion(req, res) {
    try {   
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid question ID"
        });
    }
        const questionId = req.params.id;
        const { title, description, interaction, difficulty, testCases , constraints} = req.body;

        const question = await Questions.findById(questionId);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        question.title = title || question.title;
        question.description = description || question.description;
        question.interaction = interaction || question.interaction;
        question.difficulty = difficulty || question.difficulty;
        question.testCases = testCases || question.testCases;
        question.constraints = constraints || question.constraints;

        await question.save();

        return res.status(200).json({
            message: 'Question updated successfully',
            question
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}

module.exports = updateQuestion;