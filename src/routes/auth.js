import express from "express";
import authController from "../controllers/AuthController";
import middlewareController from "../controllers/MiddlewareController";
const router = express.Router();

router.post("/register", authController.register);
router.post("/forgot", authController.forgot);
router.post("/confirmforgot", authController.confirmforgot);
router.post("/changepassword", authController.changepassword);
router.post("/userhome", authController.login);
router.post("/refresh", authController.requestRefreshToken);
router.post("/logout", authController.logout);

module.exports = router;
