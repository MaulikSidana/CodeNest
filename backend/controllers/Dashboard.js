const User = require('../models/UserModel');

const DashboardController=async (req, res) => {
  try {
    // 🔐 identity from JWT
    const email = req.user.email;

    const user = await User.findOne({ email })
      .select('userName email problemsSolved lastProblemSolved');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      message: 'User dashboard',
      user: {
        username: user.userName,
        email: user.email
      },
      stats: {
        easy: user.problemsSolved.easy,
        medium: user.problemsSolved.medium,
        hard: user.problemsSolved.hard,
        total:
          user.problemsSolved.easy +
          user.problemsSolved.medium +
          user.problemsSolved.hard
      },
      lastProblemSolved: user.lastProblemSolved
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};
module.exports = DashboardController;