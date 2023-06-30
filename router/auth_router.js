import express from "express";
import "express-async-errors";
import passport from "../middleware/auth_middleware.js";
import * as authController from "../controller/auth_controller.js";
import {isAuth} from "../middleware/auth_middleware.js";

const router = express.Router();

// GET /auth/me
router.get("/me", isAuth, authController.me);

// POST /auth/login
router.post("/login", authController.login);

// POST /auth/signup
router.post("/signup", authController.signup);

router.get("/google", passport.authenticate("google", {scope: ["profile", "email"]}));
router.get("/google/callback", passport.authenticate("google", {failureRedirect: "/", session: false}), (req, res) => {
    res.redirect("/board");
});

export default router;
