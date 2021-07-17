const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const fs = require('fs')
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const Jimp = require('jimp');
const { sendEmail } = require('./email')


require('dotenv').config();

const { User } = require('../model/userModal.js')
const { notAuthorized, UserWithPasswordAlreadyExists, notFound, passedVerification } = require('../helpers/errors')

const registerUser = async (email, password) => {
    const userWithSuchPassword = await User.findOne({ email })
    if (userWithSuchPassword) {
        throw new UserWithPasswordAlreadyExists('Email in use')
    }

    const verifyToken = `${uuidv4()}+${process.env.VERIFICATION}`;

    const user = new User({ email, password, verifyToken, avatarURL: gravatar.url(this.email, { s: '250' }, true) });
    await user.save();

    sendEmail(verifyToken, user.email);

    return user
}

const loginUser = async (email, password) => {
    const user = await User.findOne({ email, verify: true });
    const notVerifiedUser = await User.findOne({ email, verify: false });

    if (notVerifiedUser) {
        throw new notAuthorized('Please verify your account')
    }

    if (!user || !await bcrypt.compare(password, user.password)) {
        throw new notAuthorized('Email or password is wrong')
    }

    const token = jwt.sign({
        _id: user._id,
    }, process.env.JWT_SALT)
    await user.updateOne({ token: token })

    return { token };
}

const updateAvatar = async (user, file, url) => {
    const { path: pathAvatar } = file;
    const newAvatarPath = path.resolve('./public/avatars');

    const img = await Jimp.read(pathAvatar);
    await img.autocrop().cover(250, 250).writeAsync(pathAvatar);

    const [, extension] = file.originalname.split('.')
    const newNameAvatar = `${uuidv4()
        }.${extension}`;

    await fs.rename(pathAvatar, `${newAvatarPath} /${newNameAvatar}`, (err) => {
        if (err) throw err;
    })

    const newUrl = `${url}/${newNameAvatar}`
    await user.updateOne({ avatarURL: newUrl });
}

const getVerificationToken = async (verifyToken) => {
    const user = await User.findOne({ verifyToken });
    if (!user) {
        throw new notFound('User not found');
    }

    await user.update({ verifyToken: null, verify: true })
}

const sendVerificationRequest = async (email) => {
    const notVerifiedUser = await User.findOne({ email, verify: false });
    const verifiedUser = await User.findOne({ email, verify: true });

    if (verifiedUser) {
        throw new passedVerification('Verification has already been passed');
    }
    if (!notVerifiedUser && !verifiedUser) {
        throw new notFound('User not found');
    }

    sendEmail(notVerifiedUser.verifyToken, email);
}

module.exports = {
    registerUser,
    loginUser,
    updateAvatar,
    getVerificationToken,
    sendVerificationRequest
}