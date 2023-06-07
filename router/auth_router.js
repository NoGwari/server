import express from "express";
import "express-async-errors";
import * as authController from "../controller/auth_controller.js";
const router = express.Router();

// Auth difine
/**
 * @swagger
 * definitions:
 *   Auth:
 *     properties:
 *       token:
 *         type: string
 *       realid:
 *         type: string
 */

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Login api
 */

// POST /auth/login
/**
 * @swagger
 * paths:
 *  /auth/login:
 *    post:
 *      summary: "로그인"
 *      tags: [Auth]
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: user
 *          schema:
 *            type: object
 *            required:
 *              - realid
 *              - password
 *            properties:
 *              realid:
 *                type: string
 *              password:
 *                type: string
 *      responses:
 *        "200":
 *          description: 로그인 성공
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/definitions/Auth'
 *        "401":
 *          description: 로그인 실패
 */
router.post("/login", authController.login);

// POST /auth/signup
/**
 * @swagger
 * paths:
 *  /auth/signup:
 *    post:
 *      summary: "회원가입"
 *      tags: [Auth]
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: user
 *          schema:
 *            type: object
 *            required:
 *              - realid
 *              - password
 *              - nickname
 *              - email
 *            properties:
 *              realid:
 *                type: string
 *              password:
 *                type: string
 *              nickname:
 *                type: string
 *              email:
 *                type: string
 *              img:
 *                type: string
 *      responses:
 *        "200":
 *          description: 회원가입 성공
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/definitions/Auth'
 *        "401":
 *          description: 회원가입 실패
 */
router.post("/signup", authController.signup);

export default router;
