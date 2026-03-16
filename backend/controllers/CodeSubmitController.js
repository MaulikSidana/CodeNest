const express = require('express');
const Questions = require('../models/QuestionsModel');
const  {ValidateCode}  = require('./ManageCode');
const User = require('../models/UserModel');

const CodeSubmitController = async(req, res) => {
  try {
    const { language, code } = req.body;

    const curr = req.params.title;           
    const curr_title = curr.split('-').join(' '); 

    const question = await Questions.findOne({ title: curr_title });

    if (!question) {
      return res.status(404).json({
        message: 'Question not found',
      });
    }

    const questionId = question._id;

    if (!questionId || !code || !language) {
      return res.status(400).json({
        message: 'questionId, code and language are required',
      });
    }

    const result = await ValidateCode(questionId, code, language);
    if(result?.status==='Accepted'){
              const addResult = await User.updateOne(
                  { email: req.user.email },
                  { $addToSet: { solvedProblems: questionId } });
                  
                        if (addResult.modifiedCount === 1) {
                    await User.updateOne(
                      { email: req.user.email },
                      {
                        $inc: {
                          [`problemsSolved.${question.difficulty.toLowerCase()}`]: 1
                        }
                      }
                    );
                  }

                  await User.updateOne(
                    { email: req.user.email },
                    { $set: { lastProblemSolved: question.title } }
                  );

    }

    return res.status(200).json(result);

  } catch (err) {
    console.error(err);
    return res.status(501).json({
      message: `error: ${err.message} `,
    });
  }
  
};

module.exports = CodeSubmitController;
