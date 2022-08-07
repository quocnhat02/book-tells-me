import Book from "../models/Book";
import { multipleMongooseToObject } from "../util/mongoose";

class HomeController {
  // GET /
  index(req, res, next) {
    Book.find({})
      .then((books) => {
        books = multipleMongooseToObject(books);
        res.render("home", { books });
      })
      .catch((err) => console.log(err));
  }

  about(req, res, next) {
    res.render("about");
  }

  login(req, res, next) {
    res.render("login");
  }
  register(req, res, next) {
    res.render("register");
  }
}

module.exports = new HomeController();
