import homeController from "../controllers/HomeController";
import adminRouter from "../controllers/AdminController";
import genresRouter from "./genres";
import authRouter from "./auth";
import middlewareController from "../controllers/MiddlewareController";
import Book from "../models/Book";
import Genres from "../models/Genres";
import { multipleMongooseToObject } from "../util/mongoose";

let initHomeRoutes = (app) => {
  app.use("/", genresRouter);
  app.use("/", authRouter);
  app.get("/login", homeController.login);
  app.get("/register", homeController.register);
  app.get("/forgot", (req, res) => {
    res.render("forgot");
  });

  app.get("/confirmforgot", (req, res) => {
    res.render("confirmforgot");
  });

  app.get("/changeforgot", (req, res) => {
    res.render("changeforgot");
  });

  app.get("/search", async (req, res) => {
    const name = req.query.nameBook;
    var regex = new RegExp(name, "ig"),
      query = { nameBook: regex };

    Book.find(query, function (err, products) {
      Genres.find(function (err, genres) {
        if (err) {
          res.json(err);
        }
        if (products.length > 0) {
          res.render("book", {
            book: multipleMongooseToObject(products),
            genres: multipleMongooseToObject(genres),
          });
        } else {
          res.json("Not found");
        }
      });
    });
  });

  // admin
  app.delete("/admin/:id", adminRouter.delete);
  app.put("/admin/:id", adminRouter.updated);
  app.get("/admin/edit/:id", adminRouter.edit);
  app.get("/admin", adminRouter.show);
  app.get("/create", adminRouter.createBook);
  app.post("/admin", adminRouter.store);

  app.get("/", homeController.index);
};

module.exports = initHomeRoutes;
