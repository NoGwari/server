import express from "express";
import "express-async-errors";
import * as commentController from "../controller/comment_controller.js";
import {isAuth} from "../middleware/auth_middleware.js";
const router = express.Router();

// POST /comment/:id
router.post("/:id", isAuth, commentController.newComment);

export default router;
