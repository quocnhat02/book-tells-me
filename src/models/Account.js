import mongoose from "mongoose";

const { Schema } = mongoose;

const accountSchema = new Schema({
  email: { type: String, maxLength: 100, unique: true },
  password: { type: String, maxLength: 100 },
  admin: { type: Boolean, default: false },
});

module.exports = mongoose.model("Accounts", accountSchema);
