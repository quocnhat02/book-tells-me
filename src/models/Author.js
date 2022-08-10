import mongoose from "mongoose";

const { Schema } = mongoose;

const authorSchema = new Schema({
  name: { type: String, maxLength: 40 },
  birth: { type: Date },
  gender: { type: String, maxLength: 5 },
  nationality: { type: String, maxLength: 32 },
});

module.exports = mongoose.model("Authors", authorSchema);
