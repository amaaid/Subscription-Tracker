import winston from 'winston';

const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log' })
    ]
});

const errorMiddleware = (err, req, res, next) => {
    try {
        let error = { ...err };
        error.message = err.message;
        console.error(err);

        // Mongoose Object ID error
        if(err.name === 'CastError')
        {
            const message = `Resource not found`;
            error = new Error(message);
            error.statusCode = 404;
        }

        // Mongoose duplicate key error
        if(err.code === 11000)
        {
            const message = 'Duplicate field value entered';
            error = new Error(message);
            error.statusCode = 400;
        }

        //Mongoose validation error
        if(err.name === 'ValidationError')
        {
            const message = Object.values(err.errors).map(value => value.message);
            error = new Error(message.join(', '));
            error.statusCode = 400;
        }

        logger.error({
            message: err.message,
            stack: err.stack,
            path: req.path,
            method: req.method
        });

        res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || 'Server Error'
        });
    } catch (error) {
        next(error);
    }
}

export default errorMiddleware;