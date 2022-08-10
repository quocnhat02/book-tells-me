import mongoose from "mongoose";

const { Schema } = mongoose;

const accountSchema = new Schema({
  username: { type: String, maxLength: 9, unique: true },
  password: { type: String, maxLength: 100 },
  lastLogin: { type: Date, default: Date.now},
  admin: { type: Boolean, default: true },
});

module.exports = mongoose.model("Accounts", accountSchema);
