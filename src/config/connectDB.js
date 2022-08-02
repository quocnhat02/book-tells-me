import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/book-tells-me", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected Successfully to DB");
  } catch (err) {
    console.error("Not Connected to DB", err);
  }
};

module.exports = connectDB;
