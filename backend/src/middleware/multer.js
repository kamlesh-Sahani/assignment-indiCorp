import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        console.log(file)
        cb(null,"src/uploads/")
    },
    filename:function(req,file,cb){
        const ext = path.extname(file.originalname);
        const fileName = Date.now()+ext;
        cb(null,fileName);
    }
})

const fileFilter= (req,file,cb)=>{
    const allowMimeType = ["image/jpeg", "image/png", "image/jpg"];
    if(allowMimeType.includes(file.mimetype)){
        cb(null,true);
    }else{
        cb(new Error("Invalid file type. Only JPEG, PNG, and JPG are allowed."));
    }
}
 const upload = multer({
    storage,
    fileFilter
});

export default upload;