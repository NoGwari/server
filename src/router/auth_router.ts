import express from "express";
import "express-async-errors";
import passport from "../controller/auth_controller.js";
import * as authController from "../controller/auth_controller.js";
import {isAuth} from "../middleware/auth_middleware.js";
import {redisMiddleware} from "../middleware/redis.js";
const router = express.Router();

// GET /auth/me
router.get("/me", isAuth, authController.me);

// POST /auth/login
router.post("/login", authController.login);

// POST /auth/signup
router.post("/signup", authController.signup);

// POST /auth/mailsubmit
router.post("/mailsubmit", redisMiddleware, authController.mailSubmit);

// POST /auth/checkkey
router.post("/checkkey", redisMiddleware, authController.checkVerifyKey);

// GET /auth/google
router.get("/google", passport.authenticate("google", {scope: ["profile", "email"]}));
router.get("/google/callback", passport.authenticate("google", {failureRedirect: "/", session: false}), (req, res) => {
    res.redirect("/");
    // const {realId, token, expriesInSec} = req.user;
    // res.status(200).json({token, realId, expriesInSec});
});

export default router;
