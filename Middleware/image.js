const multer=require("multer")
const path=require("path")


const storage=multer.diskStorage({
destination: function(req,file,cd){
    cd(null,"uploads")
},
filename: function(req,file,cd){
    cd(null,path.extname(file.originalname))
}
})

const upload=multer({storage: storage})
    

module.exports=upload.single('image')
