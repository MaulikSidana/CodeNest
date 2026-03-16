const express = require('express');
const router = express.Router();
const authMiddleware = require('./AuthMiddle');
const AddQuestions = require('../controllers/AddQuestions');
const DeleteQuestion = require('../controllers/DeleteQuestions');
const Admin = require('../models/AdminModel');
const Questions = require('../models/QuestionsModel');
const updateQuestion = require('../controllers/UpdateQuestion');



router.post('/add-question', AddQuestions);
router.delete('/delete-question/:id', DeleteQuestion); 
router.post('/create-admin', async (req, res) => {
  const { name, email, password } = req.body;

  const adminExists = await Admin.findOne({ email });
  if (adminExists) {
    return res.status(409).json({ message: "Admin already exists" });
  }

  const admin = await Admin.create({
    name,
    email,
    password
  });

  res.json({ message: "Admin created", admin });
});

router.get('/questions', async (req, res) => {
    try {   
        const questions = await Questions.find();
        return res.status(200).json({
            message: 'List of questions',
            questions
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
});

router.get('/question/:id', async (req, res) => {
    try {
        const question = await Questions.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        return res.status(200).json({
            message: 'Question details',
            question
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
});
router.put('/question/:id',updateQuestion);

module.exports = router;
