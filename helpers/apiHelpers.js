const { ValidationError,
    MissingFieldsError,
    notFoundContact,
    notCreatedContact,
    notUpdatedContact,
    noFavoriteField } = require('./errors')

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
    if (err instanceof ValidationError ||
        err instanceof MissingFieldsError ||
        err instanceof notFoundContact ||
        err instanceof notCreatedContact ||
        err instanceof notUpdatedContact ||
        err instanceof noFavoriteField) { return res.status(err.status).json({ message: err.message }) }
    res.status(500).json({ message: err.message })
}

module.exports = {
    asyncWrapper,
    notFoundHandler,
    errorHandler
}