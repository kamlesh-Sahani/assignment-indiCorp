import toolModel from "../models/tool.model.js";
export const createTool = async (req, res) => {
  try {
    const image = req.file?.filename;
    const { name, category, quantity } = req.body;
    if (!name || !category || !quantity) {
      return res.status(400).json({
        success: false,
        message: " please fill the all fields",
      });
    }
    const tool = toolModel.create({
      title:name,
      category,
      image,
      quantity,
      createdBy: req.adminId
    });
    return res.status(201).json({
      success: true,
      message: "Tool created successfully",
      tool
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message ||  "internal error",
    });
  }
};


export const  getAll = async(req,res)=>{
  try {
    const tools = await toolModel.find();
    if(tools.length<=0){
      return res.json({
        success:false,
        message:"tools not found"
      })
    }
    return res.json({
      success:false,
      tools
    })
  } catch (error) {
    return res.json({
      success:false,
      message:error.message
    })
  }
}
