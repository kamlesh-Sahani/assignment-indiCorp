import mechanicModel from "../models/mechanic.model.js"
import jwt from "jsonwebtoken"

const tokenGenerate =  (mechanicId)=>{
    const token =  jwt.sign({_id:mechanicId},process.env.JWT_SECRET,{
        expiresIn:"2h" 
    })
    return token;
}
export const mechanicRegister = async (req, res) => {
  try {
    const { name, email, password, mobile, experience } = req.body;
    if (!name || !email || !password || !mobile || !experience) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    if(mobile.length!==10){
        return res.status(400).json({
            success: false,
            message: "mobile numner will be 10 digits",
          });
    }
   
    const isExist = await mechanicModel.findOne({
      $or: [{ email }, { mobile }],
    });
    if (isExist) {
      return res.status(400).json({
        success: false,
        message: "Email or mobile number already exists",
      });
    }

    const mechanic = await mechanicModel.create({
      name,
      email,
      password,
      mobile,
      experience,
    });
    const token = tokenGenerate(mechanic._id);

    res.cookie("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 2 * 60 * 60 * 1000
      });


    return res.status(201).json({
      success: true,
      message: "Mechanic registered successfully",
      mechanic
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const mechanicLogin = async(req,res)=>{
  try {
    const { email, password } = req.body;

    if (  !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    const mechanic = await mechanicModel.findOne({email}).select("+password");
    if(!mechanic){
      return res.status(400).json({
        success: false,
        message: "Mechanic is not found",
      });
    }

    const isMatch = await mechanic.matchPassword(password);

    if(!isMatch){
      return res.status(400).json({
        success: false,
        message: "email or password is wrong",
      });
    }

    const token = tokenGenerate(mechanic._id);
    res.cookie("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 2 * 60 * 60 * 1000
    });


    return res.status(200).json({
      success: true,
      message: "Mechanic login successfully",
      mechanic,
      token
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: error.message,
    });
  }
}
