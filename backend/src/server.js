import dotenv from "dotenv";
import express from "express";
import mechanicRoute from "./routes/mechanic.route.js";
import { dbConnect } from "./utils/database.js";
import cookieParser from "cookie-parser";
import adminRoute from "./routes/admin.route.js";
import cors from "cors"
import toolRoute from "./routes/tool.route.js";
import {fileURLToPath} from "url"
import path from 'path'
dotenv.config();
const app = express()
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(cookieParser());
dbConnect();
app.use("/api/mechanic",mechanicRoute);
app.use("/api/admin",adminRoute)
app.use("/api/tool",toolRoute)

const filePath = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filePath)
app.use("/upload",express.static(path.join(__dirname,"/uploads")))
const PORT = process.env.PORT || 4001

app.get("/",(req,res)=>{
    return res.send("welcome in backend...")
})
app.listen(PORT,()=>{
    console.log(`server is running on localhost:${PORT}`)
})