import express from "express";
import "express-async-errors";
import * as categoryController from "../controller/category_controller.js";
import {isAdimin, isAuth} from "../middleware/auth_middleware.js";
const router = express.Router();

// GET /category
router.get("/", categoryController.getCategory);

// POST /category
router.post("/", isAuth, isAdimin, categoryController.newCategory);

// DELETE /category/:id
router.delete("/:id", isAuth, isAdimin, categoryController.deleteCategory);

export default router;
