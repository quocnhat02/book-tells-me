import homeController from "../controllers/HomeController";
import adminRouter from "../controllers/AdminController";
import genresRouter from "./genres";
import authRouter from "./auth";
import Book from "../models/Book";
import middlewareController from "../controllers/MiddlewareController";

let initHomeRoutes = (app) => {
  app.use("/", authRouter);
  app.get("/login", homeController.login);
  app.get("/register", homeController.register);
  app.get("/about", homeController.about);

  app.get("/search/:nameBook", async (req, res) => {
    const name = req.body.nameBook;
    const books = await User.find({ nameBook: new RegExp(name, "i") });
    if (!books) {
      return res.json("Not found");
    }
    Book.find({ slug: req.params.slug })
      .then((books) => {
        books = multipleMongooseToObject(books);
        res.render("genres", { books });
      })
      .catch((err) => console.log(err));
  });
  // admin
  app.delete("/admin/:id", adminRouter.delete);
  app.put("/admin/:id", adminRouter.updated);
  app.get("/admin/edit/:id", adminRouter.edit);
  app.get("/admin", adminRouter.show);
  app.get("/create", adminRouter.createBook);
  app.post("/admin", adminRouter.store);

  app.use("/", genresRouter);
  app.get("/", homeController.index);
};

module.exports = initHomeRoutes;
