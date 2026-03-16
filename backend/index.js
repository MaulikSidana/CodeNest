const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const loginRouter = require('./routers/Login');
const RegisterRouter = require('./routers/Register');
const connectDB = require('./Mongoose');
const {authMiddleware,AdminOnly,UserOnly} = require('./routers/AuthMiddle');
const AdminRouter = require('./routers/Admin');
const UserRouter = require('./routers/User');
const cors = require('cors');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/login', loginRouter);
app.use('/register',RegisterRouter);

app.use(authMiddleware);

app.use('/admin', AdminOnly, AdminRouter);

app.use('/',UserOnly,UserRouter);




const start = async () => {
  try {
    await connectDB();
   

    app.listen(port, () => {
      console.log(`${port} Yes I am connected`);
    });

  } catch (error) {
    console.log(error);
  }
};

start();
