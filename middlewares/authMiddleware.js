const jwt = require('jsonwebtoken');
require('dotenv').config();

const { notAuthorized } = require('../helpers/errors')
const { User } = require('../model/userModal')

const authMiddleware = async (req, res, next) => {
    if (!req.headers['authorization']) {
        next(new notAuthorized('Please provide a token'));
    }
    const [tokenType, token] = req.headers['authorization'].split(' ');

    try {
        const user = jwt.decode(token, process.env.JWT_SALT)
        if (!user) {
            next(new notAuthorized('Invalid token'));
        }
        const userInBase = await User.findById(user._id);
        if (!userInBase.token) {
            next(new notAuthorized('Not authorized'));
        }

        req.token = token;
        req.user = user;
        next();
    } catch (err) {
        next(new notAuthorized('Invalid token'));
    }
}

module.exports = {
    authMiddleware
}