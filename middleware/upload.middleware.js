
const multer = require("multer")


const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/files")
    },
    filename:function(req,file,cb){
        // GET UNIQUE VALUE
        const uniqueSuffix = Date.now() +'-'+Math.round(Math.random()*1E9)

        // GET FILE EXTENSION----------------
        let ext = file.originalname.split('.');///GET FILE EXtENSION
        ext = ext.pop();
        ext = `.${ext}`
        // ------------------------------------

        // GET FILE ORIGINAL NAME AND REMOVE EXTENSION
        let orginalname = file.originalname.split(ext)[0]
        orginalname = orginalname.split(ext)[0];

        // REMOVE WHITESPACE FROM ORGINALNAME
        orginalname = orginalname.replace(/ /g, "")

        
        cb(null,`${orginalname}-${uniqueSuffix}${ext}`)
    }

})
const upload = multer({storage:storage})
module.exports = upload;