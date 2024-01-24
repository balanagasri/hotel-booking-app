const devErros = (res, err) => {
    res.status(err.statusCode).json({
        status: err.statusCode,
        message: err.message,
        stackTrace: err.stack,
        error: err,
    });
};

const prodErrors = (res, err) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({ status: err.statusCode, message: err.message });
    } else {
        res.status(err.statusCode).json({
            status: 'error',
            message: 'Something went wrong! Please try again later',
        });
    }
};

const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        devErros(res, err);
    } else if (process.env.NODE_ENV === 'production') {
        prodErrors(res, err);
    }
};

export default globalErrorHandler;
