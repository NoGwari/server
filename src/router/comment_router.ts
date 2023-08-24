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

// GET /comment/hits/:commentId
router.get("/hits/:id", isAuth, commentController.incrementHits);

// GET /comment/unhits/:commentId
router.get("/unhits/:id", isAuth, commentController.decrementHits);

// GET /comment/ishits/:commentId
router.get("/ishit/:id", isAuth, commentController.isHits);

export default router;
