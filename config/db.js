const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // URL-encode the password
    const password = encodeURIComponent("1600_ulahh");
    const connectionString = `mongodb+srv://ecommerce_User:${password}@cluster0.vyogebs.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0`;
    
    await mongoose.connect(connectionString);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    // Don't exit immediately for debugging
    console.log("Continuing without MongoDB...");
  }
};

module.exports = connectDB;
