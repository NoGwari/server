import express from "express";
import "express-async-errors";
import * as boardController from "../controller/board_controller.js";
import {isAdimin, isAuth} from "../middleware/auth_middleware.js";
import {redisMiddleware} from "../middleware/redis.js";
import {uploadPostImg} from "../middleware/multer.js";
const router = express.Router();

// GET /board?page=1&list_num=10&category=1
router.get("/", boardController.getPostingByPage);

// GET /board/search?searchType=title&keyword=제목
router.get("/search", boardController.getSearch);

// GET /board/hits/1
router.get("/hits/:id", isAuth, boardController.incrementHits);

// GET /board/unhits/1
router.get("/unhits/:id", isAuth, boardController.decrementHits);

// GET /board/ishits/1
router.get("/ishit/:id", isAuth, boardController.isHits);

// POST /board/report/1
router.post("/report/:id", isAuth, boardController.report);

// GET /board/1
router.get("/:id", redisMiddleware, boardController.getPosting);

// POST /board
router.post("/", isAuth, boardController.newPosting);

// POST /board/upload
router.post("/upload", uploadPostImg.single("image"), boardController.newImage);

// PUT /board/1
router.put("/:id", isAuth, boardController.updatePost);

// Delete /board/1
router.delete("/:id", isAuth, boardController.deletePost);

export default router;
