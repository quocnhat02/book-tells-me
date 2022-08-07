import express from "express";
import authController from "../controllers/AuthController";
import middlewareController from "../controllers/MiddlewareController";
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh", authController.requestRefreshToken);
router.post("/logout", middlewareController.verifyToken, authController.logout);

module.exports = router;
