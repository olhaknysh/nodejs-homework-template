const { CustomError } = require('./errors')

const asyncWrapper = (controller) => {
    return (req, res, next) => {
        controller(req, res).catch(next);
    }
}

const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found',
    })
    next()
}

const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomError) { return res.status(err.status).json({ message: err.message }) }
    res.status(500).json({ message: err.message })
}

module.exports = {
    asyncWrapper,
    notFoundHandler,
    errorHandler
}