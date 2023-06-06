import express from "express";
import "express-async-errors";
import * as boardController from "../controller/board_controller.js";
const router = express.Router();

/**
 * @swagger
 * paths:
 *  /board:
 *    get:
 *      summary: "전체 게시글 조회"
 *      description: ""
 *      responses:
 *        "200":
 *          description: 전체 게시글 목록조회
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    posts:
 *                      type: object
 */
router.get("/", boardController.getPostingByPage);
/**
 * @swagger
 * paths:
 *  /board:/{id}:
 *    get:
 *      summary: "전체 게시글 조회"
 *      description: ""
 *      responses:
 *        "200":
 *          description: 전체 게시글 목록조회
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    posts:
 *                      type: object
 */
router.get("/:id", boardController.getPosting);

// POST /board
router.post("/", boardController.newPosting);

// PUT /board/:id
router.put("/:id", boardController.updatePost);

// DELETE /board/:id
router.delete("/:id", boardController.deletePost);

export default router;
