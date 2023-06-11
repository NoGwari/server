import express from "express";
import "express-async-errors";
import * as categoryController from "../controller/category_controller.js";
const router = express.Router();

// Category difine
/**
 * @swagger
 * definitions:
 *   Category:
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 *       post_num:
 *         type: integer
 */

/**
 * @swagger
 * tags:
 *   - name: Category
 *     description: Category api
 */

// GET /category
/**
 * @swagger
 * paths:
 *  /Category:
 *    get:
 *      summary: "전체 게시글 조회"
 *      tags: [Category]
 *      responses:
 *        "200":
 *          description: 카테고리 조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/definitions/Category'
 */

router.get("/", categoryController.getCategory);

// POST /category
/**
 * @swagger
 * paths:
 *  /category:
 *    post:
 *      summary: "카테고리 추가"
 *      tags: [Category]
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: board
 *          schema:
 *            type: object
 *            required:
 *              - name
 *            properties:
 *              name:
 *                type: string
 *      responses:
 *        "201":
 *          description: 카테고리 추가 성공
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/definitions/Category'
 */
router.post("/", categoryController.newCategory);

// DELETE /category/:id
/**
 * @swagger
 * paths:
 *  /category/{id}:
 *    delete:
 *      summary: "단일 카테고리 삭제"
 *      tags: [Category]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          type: integer
 *          minimun: 1
 *          description: "게시글의 ID값으로 서칭"
 *      responses:
 *        "200":
 *          description: 카테고리 삭제 성공
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/definitions/Category'
 *        "404":
 *          description: 해당 게시글 미존재
 */
router.delete("/:id", categoryController.deleteCategory);

export default router;
