import mongoose from "mongoose";
import "dotenv/config";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected Successfully to DB");
  } catch (err) {
    console.error("Not Connected to DB", err);
  }
};

module.exports = connectDB;
