import mongoose from "mongoose";

const { Schema } = mongoose;

const downloadSchema = new Schema({
  dayDownload: { type: Date, default: Date.now },
  accounts: [{ type: Schema.Types.ObjectId, ref: "Accounts" }],
  books: [{ type: Schema.Types.ObjectId, ref: "Books" }],
});

module.exports = mongoose.model("Download", downloadSchema);
