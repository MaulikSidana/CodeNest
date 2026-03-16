const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');

router.get('/', (req, res) => {
  res.send('Register Page');
});

router.post('/', async (req, res) => {
  try {
    const {userName,email,password } = req.body;

    
    if (!userName || !email || !password) {
      return res.status(400).json({ message: 'Email and password and UserName are required' });
    }

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    
    const newUser = new User({userName,email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
