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
            message:'Something went wrong! try again later'
        })
    }
}


const castErrorHandler = (err)=>{
    const msg = `Invalid value ${err.value} for field ${err.path}`
    return  new CustomError(msg,404);
}


module.exports = (error,req,res,next)=>{
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';


    if(process.env.NODE_ENV === "development"){
        console.log('development error occured');
        devErrors(res,error);

    }else if(process.env.NODE_ENV === "production"){
      let err = {...error};

      if(err.name = "CastError"){
        err = castErrorHandler(err);
      }
      prodErrors(res,err);
    }else{
        res.status(500).json({
            status:"error",
            message:'Something went wrong! try again later'
        })
    }

};
