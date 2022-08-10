import mongoose from "mongoose";

const { Schema } = mongoose;

const evaluateSchema = new Schema({
  content: { type: String, maxLength: 500 },
  accounts: [{ type: Schema.Types.ObjectId, ref: "Accounts" }],
  books: [{ type: Schema.Types.ObjectId, ref: "Books" }],
});

module.exports = mongoose.model("Evaluate", evaluateSchema);
