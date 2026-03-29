import  express from "express";
import { authController } from "../di/auth.js";
import { AuthMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/signup",authController.signup)
router.post("/login",authController.login)
router.post("/logout",AuthMiddleware.authenticate,authController.logout)



export default router