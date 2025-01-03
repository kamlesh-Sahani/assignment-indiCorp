import express from "express";
import { createTool, getAll } from "../controllers/tool.controller.js";
import upload from "../middleware/multer.js";
import { authentication } from "../middleware/authentication.js";
const router = express.Router();
router.post("/new",authentication,upload.single("image"),createTool)
router.get("/all",getAll)
export default router;