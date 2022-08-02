import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, maxLength: 100 },
  password: { type: String, maxLength: 100 },
  users: [{ type: Schema.Types.ObjectId, ref: "Users" }],
});

module.exports = mongoose.model("Users", userSchema);
