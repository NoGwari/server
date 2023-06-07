import express from "express";
import "express-async-errors";
import * as boardController from "../controller/board_controller.js";
const router = express.Router();

// GET /board?page=1&list_num=5&category=1
/**
 * @swagger
 * definitions:
 *   Board:
 *     properties:
 *       id:
 *         type: integer
 *       title:
 *         type: string
 *       content:
 *         type: string
 *       views:
 *         type: integer
 *       hits:
 *         type: integer
 *       dislikes:
 *         type: integer
 *       reported:
 *         type: integer
 *       createdAt:
 *         type: string
 *         format: date-time
 *       updatedAt:
 *         type: string
 *         format: date-time
 *       userId:
 *         type: integer
 *       categoryId:
 *         type: integer
 *       userNickname:
 *         type: string
 *       userImg:
 *         type: string
 *       userGrade:
 *         type: string
 *       categoryName:
 *         type: string
 */

/**
 * @swagger
 * paths:
 *  /board:
 *    get:
 *      summary: "전체 게시글 조회"
 *      parameters:
 *      - in: query
 *        name: page
 *        type: integer
 *        description: "page 번호 / defalut = 1"
 *      - in: query
 *        name: list_num
 *        type: integer
 *        description: "item 개수 / defalut = 5"
 *      - in: query
 *        name: category
 *        type: integer
 *        description: "category 번호 / 기입안할시 전체 게시글 검색"
 *      responses:
 *        "200":
 *          description: 게시글 조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/definitions/Board'
 */

router.get("/", boardController.getPostingByPage);

// GET /board/id
/**
 * @swagger
 * paths:
 *  /board/{id}:
 *    get:
 *      summary: "단일 게시글 조회"
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          type: integer
 *          minimun: 1
 *          description: "게시글의 ID값으로 서칭"
 *      responses:
 *        "200":
 *          description: 게시글 조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/definitions/Board'
 *        "404":
 *          description: 해당 게시글 미존재
 */
router.get("/:id", boardController.getPosting);

// POST /board
/**
 * @swagger
 * paths:
 *  /board:
 *    post:
 *      summary: "게시글 추가"
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: board
 *          schema:
 *            type: object
 *            required:
 *              - title
 *              - content
 *              - userId
 *              - categoryId
 *            properties:
 *              title:
 *                type: string
 *              content:
 *                type: string
 *              hiddenNum:
 *                type: string
 *              userId:
 *                type: integer
 *              categoryId:
 *                type: integer
 *      responses:
 *        "201":
 *          description: 게시글 추가 성공
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/definitions/Board'
 */
router.post("/", boardController.newPosting);

// PUT /board/:id
router.put("/:id", boardController.updatePost);

// DELETE /board/:id
router.delete("/:id", boardController.deletePost);

export default router;
