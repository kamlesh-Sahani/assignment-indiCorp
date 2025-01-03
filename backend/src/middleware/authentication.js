import jwt from "jsonwebtoken";
import adminModel from "../models/admin.model.js";
export const authentication = async(req,res,next)=>{
    try {
        const token = req.cookies["auth-token"];
        if(!token){
            return res.status(401).json({
                success:false,
                messgae:"token is not found"
            })
        }

        const id = jwt.verify(token,process.env.JWT_SECRET);
        const admin = await adminModel.findById(id);
        if(!admin){
            return res.status(401).json({
                success:false,
                message:"unauthorized user"
            })
        }
        req.adminId = admin._id;
        next();
    } catch (error) {
        return res.json({
            success:false,
            message:error.message
        })
    }
}