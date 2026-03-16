const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const Admin = require('../models/AdminModel');
const JWT_SECRET = 'MERA_LEETCODE';
const mongoose = require('mongoose');
router.get('/', (req, res) => {
  res.send('Login Page');
});
router.post('/', async (req, res) => {
  try {
    const { email, password ,role} = req.body;
    const isUser= (role==='user')?true:false;
    let user;
    if(isUser){
     user = await User.findOne({ email, password });
  }
  else{
      user = await Admin.findOne({ email, password });
  }
 
     if (!user) {
      return res.status(401).json({ message: `Invalid email or password` });
     }
     
  

    const token = jwt.sign(
      { id: user._id, email: user.email ,role:role},
      JWT_SECRET,
      { expiresIn: '1day' },
      
    );

    return res.json({
      message: 'Login successful',
      token :token,
      role: role
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
