import Book from "../models/Book";
import { multipleMongooseToObject } from "../util/mongoose";

class HomeController {
  // GET /
  index(req, res, next) {
    Book.find({})
      .then((books) => {
        books = multipleMongooseToObject(books);
        res.render("genres", { books });
      })
      .catch((err) => console.log(err));
  }
}

module.exports = new HomeController();
