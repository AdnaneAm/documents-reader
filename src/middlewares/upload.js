const multer=require('multer');
// Multer storage configuration
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,'public/uploads/');
    },
    filename:(req,file,cb)=>{
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix+file.originalname);
    }
});
// Function to filter file type (accepts only images)
const fileFilter=(req,file,cb)=>{
    const allowedTypes=["image/jpeg","image/jpg","image/png","application/pdf"];
    if(!allowedTypes.includes(file.mimetype)){
        const err=new Error("Incorrect file");
        err.code="INCORRECT_FILETYPE";
        return cb(err,false);
    }
    cb(null,true);
}

// Middleware for catching errors
exports.handleErrors=(err,req,res,next)=>{
    if(err.code==="INCORRECT_FILETYPE") return res.status(422).send('Only Images Are Allowed');
    if(err.code==="LIMIT_FILE_SIZE") return res.status(422).send('Allow file size is 5MB');
    next();
}

exports.uploads = multer({
    storage,
    fileFilter,
    limits:{
        fileSize:1024*1024*5
    }
});