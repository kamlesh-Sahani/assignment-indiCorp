import express from "express";
import { mechanicLogin, mechanicRegister } from "../controllers/mechanic.controller.js";


const router = express.Router();

router.post("/register",mechanicRegister)
router.post("/login",mechanicLogin)

export default router;