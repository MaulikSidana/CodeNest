const express = require('express');
const router = express.Router();
const ValidateCode = require('../controllers/ManageCode');
const Questions = require('../models/QuestionsModel');
const CodeSubmitController = require('../controllers/CodeSubmitController');
const DashboardController = require('../controllers/Dashboard');
const User = require('../models/UserModel');
router.get('/problems', async (req, res) => {
  try {
    const problems = await Questions.find();

    return res.status(200).json({
      message: 'List of problems',
      problems
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal server error'
    });
  }
});
router.get('/problems/:title', async (req, res) => {
  try {
    const title = req.params.title.split("-").join(" ");
    const problem = await Questions.findOne({ title });

    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }
   
    const curr = await User.exists({
      email: req.user.email,
      solvedProblems: problem._id
      });
      let isSolved=(curr)?true:false;


    return res.status(200).json({
      message: 'Problem details',
      problem :problem,
      isSolved: isSolved
    });
  } catch (err) {
    console.error(err);
    return res.status(501).json({
      message: err.message
    });
  }
});
router.get('/dashboard', DashboardController);

router.post('/problems/:title', CodeSubmitController);

module.exports = router;
