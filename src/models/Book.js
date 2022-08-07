import mongoose from "mongoose";

const { Schema } = mongoose;

const bookSchema = new Schema({
  nameBook: { type: String, maxLength: 100 },
  description: { type: String, maxLength: 600 },
  image: { type: String, maxLength: 255 },
  urlDownload: { type: String, maxLength: 255 },
  // admins: { type: Schema.Types.ObjectId, ref: "Admins" },
  genres: { type: String, maxLength: 100 },
  author: { type: String, maxLength: 100 },
  slug: { type: String, maxLength: 100 },
});

module.exports = mongoose.model("Books", bookSchema);
