import express from "express";
import { mechanicLogin, mechanicLogout, mechanicProfile, mechanicRegister } from "../controllers/mechanic.controller.js";
import upload from "../middleware/multer.js"
const router = express.Router();
router.post("/register",upload.single("profile"),mechanicRegister)
router.post("/login",mechanicLogin)
router.get("/me",mechanicProfile)
router.get("/logout",mechanicLogout)
export default router;