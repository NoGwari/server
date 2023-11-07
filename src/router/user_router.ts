import express from "express";
import "express-async-errors";
import * as userController from "../controller/user_controller.js";
import {isAuth} from "../middleware/auth_middleware.js";
import {uploadUserImg} from "../middleware/multer.js";
import {redisMiddleware} from "../middleware/redis.js";
const router = express.Router();

// GET /user/mypost
router.get("/mypost", isAuth, userController.getPost);

// GET /user/comment
router.get("/mycomment", isAuth, userController.getComment);

// PUT /user/default
router.put("/default", isAuth, userController.updateDefalutImage);

// POST /user/mailSubmitForInitPassword
router.post("/mailSubmitForInitPassword", redisMiddleware, userController.mailSubmitForInitPassword);

// PUT /user/initpassword
router.put("/initpassword", redisMiddleware, userController.updateInitPassword);

// PUT /user/updatenick
router.put("/updatenick", isAuth, userController.changeNickname);

// DELETE /user/withdrawal
router.delete("/withdrawal", isAuth, userController.withDrawal);

// POST /user/upload
router.post("/upload", isAuth, uploadUserImg.single("image"), userController.newImage);

export default router;
