const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://sidana_db_user:123123123@cluster0.mfgsqrl.mongodb.net/leetcode",

    );

    console.log("✅ MongoDB connected");
  } catch (err) {
    console.log("❌ MongoDB connection failed:", err.message);
    process.exit(1); // 🔥 VERY IMPORTANT
  }
};

module.exports = connectDB;
