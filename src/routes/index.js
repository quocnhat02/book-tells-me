import homeController from "../controllers/HomeController";

let initHomeRoutes = (app) => {
  app.get("/", homeController.index);
};

module.exports = initHomeRoutes;
