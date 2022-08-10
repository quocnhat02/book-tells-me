import Book from "../models/Book";
import Genres from "../models/Genres";
import { mongooseToObject, multipleMongooseToObject } from "../util/mongoose";

class GenresController {
  // GET /
  show(req, res, next) {
    // Book.find({ slug: req.params.slugGenres })
    //   .then((books) => {
    //     books = multipleMongooseToObject(books);
    //     res.render("genres", { books });
    //   })
    //   .catch((err) => console.log(err));

    Book.find({ slug: req.params.slugGenres }, function (err, books) {
      Genres.find(function (err, genres) {
        res.render("genres", {
          books: multipleMongooseToObject(books),
          genres: multipleMongooseToObject(genres),
        });
      });
    });
  }

  display(req, res, next) {
    Book.find({ nameBook: req.params.nameBook }, function (err, books) {
      Genres.find(function (err, genres) {
        res.render("book", {
          book: multipleMongooseToObject(books),
          genres: multipleMongooseToObject(genres),
        });
      });
    });
  }
}

module.exports = new GenresController();
