import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, maxLength: 100 },
  // email: { type: String, maxLength: 100, unique: true},
  // password: { type: String, maxLength: 100},
  address: { type: String, maxLength: 100 },
  phone: { type: String, maxLength: 15 },
  birth: { type: Date },
  gender: { type: String, maxLength: 5 },
  // admin: { type: Boolean, default: false },
});

module.exports = mongoose.model("Users", userSchema);
