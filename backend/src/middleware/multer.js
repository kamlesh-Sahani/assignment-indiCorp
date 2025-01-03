import multer from "multer";
import path from "path";
import {fileURLToPath} from "url"
const filePath = fileURLToPath(import.meta.url);
console.log(filePath)
const __dirname= path.dirname(filePath);
console.log(__dirname)
const storage = multer.diskStorage({
    destination:function(req,file,cb){
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