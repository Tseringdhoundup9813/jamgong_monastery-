const CustomError = require("../utils/custome.error");


const devErrors = (res,error)=>{
    res.status(error.statusCode).json({
        status:error.statusCode,
        message:error.message,
        stackTrace: error.stack,
        error:error
    });
}

const prodErrors = (res,error)=>{
    if(error.isOperational){
     res.status(error.statusCode).json({
            status:error.statusCode,
            message:error.message,
    
        });

    }else{
      res.status(500).json({
            status:"error",
            message:'Something went wrong! try again later--'
        })
    }
}


const castErrorHandler = (err)=>{
    const msg = `Invalid value ${err.value} for field ${err.path}`
    return  new CustomError(msg,404);
}

const validationErrorHandler =(err)=>{
    const errors = object.values(err.error).map(val=>val.message);
    const errorMessage = errors.join('. ');
    const msg = `Invalid input data: ${errorMessage}`
    return new CustomError(msg,400);
}   


module.exports = (error,req,res,next)=>{
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';


    if(process.env.NODE_ENV === "development"){
        devErrors(res,error);

    }else if(process.env.NODE_ENV === "production"){
      if(error.name === "CastError") { error = castErrorHandler(error)}
      if(error.name === "ValidationError") error = validationErrorHandler(error);
      prodErrors(res,error);
    }

};
