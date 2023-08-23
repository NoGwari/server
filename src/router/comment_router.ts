import express from "express";
import "express-async-errors";
import * as commentController from "../controller/comment_controller.js";
import {isAuth} from "../middleware/auth_middleware.js";
const router = express.Router();

// GET /comment/:boardId
router.get("/:id", commentController.getComment);

// POST /comment/:boardId
router.post("/:id", isAuth, commentController.newComment);

// POST /comment/reply/:boardId
router.post("/reply/:id", isAuth, commentController.newReply);

export default router;
