import mongoose from "mongoose";

const { Schema } = mongoose;

const adminSchema = new Schema({
  email: { type: String, maxLength: 100 },
  password: { type: String, maxLength: 50 },
  name: { type: String, maxLength: 100 },
  address: { type: String, maxLength: 100 },
  phone: { type: String, maxLength: 15 },
  birth: { type: Date },
  gender: { type: String, maxLength: 5 },
});

module.exports = mongoose.model("Admins", adminSchema);
