import express from "express";
import "express-async-errors";
import * as mainController from "../controller/main_controller.js";
const router = express.Router();

// GET /
router.get("/", mainController.getCategory);

export default router;
