const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const { User } = require('../model/userModal.js')
const { notAuthorized, UserWithPasswordAlreadyExists } = require('../helpers/errors')

const registerUser = async (email, password) => {
    const userWithSuchPassword = await User.findOne({ email })
    if (userWithSuchPassword) {
        throw new UserWithPasswordAlreadyExists('Email in use')
    }

    const user = new User({ email, password });
    await user.save();
    return user
}

const loginUser = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user || !await bcrypt.compare(password, user.password)) {
        throw new notAuthorized('Email or password is wrong')
    }

    const token = jwt.sign({
        _id: user._id,
    }, process.env.JWT_SALT)
    await user.updateOne({ token: token })

    return { token };
}

const logoutUser = async (userId) => {
    const user = await User.findById(userId);
    await user.updateOne({ token: null })
}

const getCurrentUser = async (userId) => {
    const user = await User.findById(userId);
    const { email, subscription } = user;
    return { email, subscription };
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser
}