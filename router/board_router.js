import express from "express";
import "express-async-errors";
import * as boardController from "../controller/board_controller.js";
const router = express.Router();

// GET /board?page=1&list_num=10
router.get("/", boardController.getPostingByPage);

// GET /board/:id
router.get("/:id", boardController.getPosting);

// POST /board
router.post("/", boardController.newPosting);

// PUT /board/:id
router.put("/:id", boardController.updatePost);

// DELETE /board/:id
router.delete("/:id", boardController.deletePost);

export default router;
