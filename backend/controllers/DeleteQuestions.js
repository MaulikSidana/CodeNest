const Questions = require('../models/QuestionsModel');
const User = require('../models/UserModel');
const mongoose = require('mongoose');

const DeleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

     if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid question ID"
      });
    }

    const question = await Questions.findByIdAndDelete(id);

    if (!question) {
      return res.status(404).json({
        message: "Question not found"
      });
    }
   await User.deleteMany({
      solvedProblems: question._id
    });

    return res.status(200).json({
      message: "Question deleted successfully"
    });

  } catch (error) {
    console.error("Delete error:", error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};

module.exports = DeleteQuestion;
