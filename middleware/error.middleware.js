const errorMiddleware = (err,req,res,next) => {
    try {
        let error = {...err};
        error.message = err.message;

        console.error(err)

        // Mongoose bad Objectid 
        if(err.name === 'CastError'){
            const message = 'Resource not found'
            error = new Error(message)
            error.statusCode = 404;
        }

        // Mongoose duplicate key 
        if(err.code === 11000){
            const message = 'Duplicate Field value Entered'
            error = new Error(message)
            error.statusCode = 400;
        }

        // Mongoose Validation Error 
        if(err.name === 'ValidationError'){
            const message = Object.values(err.errors).map(val => val.message)
            error = new Error(message.join(', '))
            error.statusCode = 400
        }

        res.status(error.statusCode || 500).json({succes:false,error:error.message || "server Error"})
    } catch (error) {
        next(error)
        
    }
}

export default errorMiddleware;