import express from "express";
import { adminLogin, adminLogout, adminProfile, adminRegister } from "../controllers/admin.controller.js";
import { authentication } from "../middleware/authentication.js";
const router = express.Router();
router.post("/register",adminRegister)
router.post("/login",adminLogin)
router.get("/me",authentication,adminProfile)
router.get("/logout",authentication,adminLogout)
export default router;