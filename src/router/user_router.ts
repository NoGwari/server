import express from "express";
import "express-async-errors";
import * as userController from "../controller/user_controller.js";
import {isAuth} from "../middleware/auth_middleware.js";
import {uploadUserImg} from "../middleware/multer.js";
const router = express.Router();

// PUT /user/updatenick
router.put("/updatenick", isAuth, userController.changeNickname);

// DELETE /user/withdrawal
router.delete("/withdrawal", isAuth, userController.withDrawal);

// POST /user/upload
router.post("/upload", isAuth, uploadUserImg.single("image"), userController.newImage);

export default router;
