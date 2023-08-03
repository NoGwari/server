import express from "express";
import "express-async-errors";
import * as userController from "../controller/user_controller.js";
import {isAuth} from "../middleware/auth_middleware";
const router = express.Router();

// PUT /user/updatenick
router.put("/updatenick", isAuth, userController.changeNickname);

// DELETE /user/withdrawal
router.delete("/withdrawal", isAuth, userController.withDrawal);

export default router;
