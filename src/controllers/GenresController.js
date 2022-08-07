import Book from "../models/Book";
import { mongooseToObject, multipleMongooseToObject } from "../util/mongoose";

class GenresController {
  // GET /
  show(req, res, next) {
    Book.find({ slug: req.params.slug })
      .then((books) => {
        books = multipleMongooseToObject(books);
        res.render("genres", { books });
      })
      .catch((err) => console.log(err));
  }
}

module.exports = new GenresController();
