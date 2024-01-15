const multer=require("multer");
const imageUpload=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./file")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const upload=multer({
    storage:imageUpload
})
module.exports={upload}