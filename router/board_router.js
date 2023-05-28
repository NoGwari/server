import express from "express";
import "express-async-errors";
import * as boardController from "../controller/board_controller.js";
const router = express.Router();

// GET /board?page=1&list_num=10
router.get("/", boardController.getPostingByPage);

// GET /board/:id
// router.get("/:id", isAuth, boardController.getTweet);
router.get("/:id", boardController.getPosting);

// POST /board
// router.post("/", isAuth, validateTweet, boardController.createTweet);
router.post("/post", boardController.newPostings);

// PUT /board/:id
router.put("/:id", boardController.updatePost);

// DELETE /board/:id
// router.delete("/:id", isAuth, boardController.deleteTweet);

// DELETE /board?username=:username
// router.delete("/", isAuth, boardController.deleteTweetByUserId);

export default router;
