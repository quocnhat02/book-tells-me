import mongoose from "mongoose";

const { Schema } = mongoose;

const adminSchema = new Schema({
  email: { type: String, maxLength: 256 },
  name: { type: String, maxLength: 40 },
  address: { type: String, maxLength: 120 },
  phone: { type: String, maxLength: 15 },
  birth: { type: Date },
  gender: { type: String, maxLength: 5 },
});

module.exports = mongoose.model("Admins", adminSchema);
