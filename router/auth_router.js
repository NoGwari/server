import express from "express";
import "express-async-errors";
import * as authController from "../controller/auth_controller.js";
import {isAuth} from "../middleware/auth_middleware.js";
const router = express.Router();

// GET /auth/me
router.get("/me", isAuth, authController.me);

// POST /auth/login
router.post("/login", authController.login);

// POST /auth/signup
router.post("/signup", authController.signup);

export default router;
