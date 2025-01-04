import adminModel from "../models/admin.model.js";
import jwt from "jsonwebtoken"

const tokenGenerate =  (mechanicId)=>{
    const token =  jwt.sign({_id:mechanicId},process.env.JWT_SECRET,{
        expiresIn:"2h" 
    })
    return token;
}
export const adminRegister = async (req, res) => {
  try {
    const { name, email, password, } = req.body;
    if (!name || !email || !password ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }
   
    const isExist = await adminModel.findOne({email});
    if (isExist) {
      return res.status(400).json({
        success: false,
        message: "admin already exists",
      });
    }
    const admin = await adminModel.create({
      name,
      email,
      password,
    });
    const token = tokenGenerate(admin._id);

    res.cookie("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 2 * 60 * 60 * 1000
      });


    return res.status(201).json({
      success: true,
      message: "admin registered successfully",
      admin
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const adminLogin = async(req,res)=>{
  try {
    const { email, password } = req.body;

    if (  !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    const admin = await adminModel.findOne({email}).select("+password");
    if(!admin){
      return res.status(400).json({
        success: false,
        message: "admin is not found",
      });
    }

    const isMatch = await admin.matchPassword(password);

    if(!isMatch){
      return res.status(400).json({
        success: false,
        message: "email or password is wrong",
      });
    }

    const token = tokenGenerate(admin._id);
    res.cookie("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 2 * 60 * 60 * 1000
    });
    return res.status(200).json({
      success: true,
      message: "admin login successfully",
      admin,
      token
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: error.message,
    });
  }
}

export const adminProfile = async(req,res)=>{
  try {
    const adminId= req.adminId;
    const admin = await adminModel.findById(adminId);
    if(!admin){
      return res.json({
        success:false,
      message:"admin not found"
      })
    }
    return res.json({
      success:true,
      admin
    })
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: error.message,
    });
  }
}


export const adminLogout = (req,res)=>{
  try {
    res.cookie("auth-token","",{
      maxAge:0,
       httpOnly: true, 
      secure: process.env.NODE_ENV === "production",
    })

    return res.status(200).json({
      success:true,
      message:"logout successfuly"
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
