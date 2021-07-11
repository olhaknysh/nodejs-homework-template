const Joi = require('joi');
const { ValidationError,
    MissingFieldsError } = require('../helpers/errors')

const schemaUser = Joi.object({
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net'] },
        })
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})

const validate = (schema, body, next) => {
    if (Object.keys(body).length === 0) {
        return next(new MissingFieldsError('missing fields'))
    }
    const { error } = schema.validate(body)
    if (error) {
        const [{ message }] = error.details
        return next(new ValidationError(message))
    }
    next()
}

const validateUser = (req, res, next) => {
    return validate(schemaUser, req.body, next)
}

module.exports = {
    validateUser,
}
