import homeController from "../controllers/HomeController";
import adminRouter from "../controllers/AdminController";
import genresRouter from "./genres";
import authRouter from "./auth";
import middlewareController from "../controllers/MiddlewareController";

let initHomeRoutes = (app) => {
  app.use("/", authRouter);
  app.get("/login", homeController.login);
  app.get("/register", homeController.register);

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
