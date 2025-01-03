import express from "express";
import { adminLogin, adminProfile, adminRegister } from "../controllers/admin.controller.js";
import { authentication } from "../middleware/authentication.js";
const router = express.Router();
router.post("/register",adminRegister)
router.post("/login",adminLogin)
router.get("/me",authentication,adminProfile)

export default router;