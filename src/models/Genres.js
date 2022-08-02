import mongoose from "mongoose";

const { Schema } = mongoose;

const genresSchema = new Schema({
  nameGenres: { type: String, maxLength: 100 },
  description: { type: String, maxLength: 600 },
});

module.exports = mongoose.model("Genres", genresSchema);
