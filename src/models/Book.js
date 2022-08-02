import mongoose from "mongoose";

const { Schema } = mongoose;

const bookSchema = new Schema({
  nameBook: { type: String, maxLength: 100 },
  description: { type: String, maxLength: 600 },
  image: { type: String, maxLength: 255 },
  urlDownload: { type: String, maxLength: 255 },
  admins: { type: Schema.Types.ObjectId, ref: "Admins" },
  genres: { type: Schema.Types.ObjectId, ref: "Genres" },
  author: { type: Schema.Types.ObjectId, ref: "Authors" },
});

module.exports = mongoose.model("Books", bookSchema);
