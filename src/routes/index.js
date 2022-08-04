import homeController from "../controllers/HomeController";
import adminRouter from "../controllers/AdminController";

let initHomeRoutes = (app) => {
  app.get("/create", adminRouter.createBook);
  app.post("/store", adminRouter.store);
  app.get("/admin", adminRouter.show);
  app.get("/", homeController.index);
};

module.exports = initHomeRoutes;
