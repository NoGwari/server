import express from "express";
import "express-async-errors";
import * as categoryController from "../controller/category_controller.js";
const router = express.Router();

// GET /
router.get("/", categoryController.getCategory);

export default router;
