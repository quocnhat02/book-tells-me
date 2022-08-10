import Book from "../models/Book";
import Genres from "../models/Genres";
import { multipleMongooseToObject } from "../util/mongoose";

class HomeController {
  // GET /
  index(req, res, next) {
    // const genres = Genres;
    // Book.find({})

    //   .then((books) => {
    //     books = multipleMongooseToObject(books);

    //     res.render("home", { books, genres: genres });
    //   })
    //   .catch((err) => console.log(err));

    Book.find(function (err, books) {
      Genres.find(function (err, genres) {
        res.render("home", {
          books: multipleMongooseToObject(books),
          genres: multipleMongooseToObject(genres),
        });
      });
    });
  }

  login(req, res, next) {
    res.render("login");
  }
  register(req, res, next) {
    res.render("register");
  }

  forgot(req, res, next) {
    res.render("forgot");
  }
}

module.exports = new HomeController();
