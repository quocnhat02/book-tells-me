import Book from "../models/Book";
import { multipleMongooseToObject } from "../util/mongoose";

class AdminController {
  // GET /
  show(req, res, next) {
    res.render("admin/adminPage");
  }

  // GET /admin/create
  createBook(req, res, next) {
    res.render("admin/createBook");
  }

  store(req, res, next) {
    const formData = req.body;
    const newBook = new Book(formData);
    newBook.save();

    res.send(req.body);
  }
}

module.exports = new AdminController();
