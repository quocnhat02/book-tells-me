import Book from "../models/Book";
import { mongooseToObject, multipleMongooseToObject } from "../util/mongoose";

class AdminController {
  // GET /
  show(req, res, next) {
    Book.find({})
      .then((books) => {
        books = multipleMongooseToObject(books);
        res.render("admin/adminPage", { books });
      })
      .catch((err) => console.log(err));
  }

  // GET /admin/create
  createBook(req, res, next) {
    res.render("admin/createBook");
  }

  store(req, res, next) {
    const formData = req.body;
    const newBook = new Book(formData);
    newBook.save();

    res.redirect("/admin");
  }

  edit(req, res, next) {
    // const book = Book.findOne({ _id: req.params.id }).lean();

    // res.render("admin/updateBook", { book });
    Book.find({ _id: req.params.id })
      .then((books) => {
        books = multipleMongooseToObject(books);
        res.render("admin/updateBook", { books });
      })
      .catch((err) => console.log(err));
  }

  updated(req, res, next) {
    // const { nameBook, description, urlDownload, image, genres, author, slug } =
    //   req.body;
    // Book.findOneAndUpdate(
    //   { _id: req.params.id },
    //   { nameBook, description, urlDownload, image, genres, author, slug }
    // );
    // res.redirect("/admin");
    Book.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/admin"))
      .catch((err) => console.log(err));
  }

  delete(req, res, next) {
    Book.findOneAndRemove({ _id: req.params.id })
      .then(() => res.redirect("/admin"))
      .catch((err) => console.log(err));
  }
}

module.exports = new AdminController();
