const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const fs = require('fs')
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const Jimp = require('jimp');


require('dotenv').config();

const { User } = require('../model/userModal.js')
const { notAuthorized, UserWithPasswordAlreadyExists } = require('../helpers/errors')

const registerUser = async (email, password) => {
    const userWithSuchPassword = await User.findOne({ email })
    if (userWithSuchPassword) {
        throw new UserWithPasswordAlreadyExists('Email in use')
    }

    const user = new User({ email, password, avatarURL: gravatar.url(this.email, { s: '250' }, true) });
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

const updateAvatar = async (user, file, url) => {
    const { path: pathAvatar } = file;
    const newAvatarPath = path.resolve('./public/avatars');

    const img = await Jimp.read(pathAvatar);
    await img.autocrop().cover(250, 250).writeAsync(pathAvatar);

    const [, extension] = file.originalname.split('.')
    const newNameAvatar = `${uuidv4()}.${extension}`;

    await fs.rename(pathAvatar, `${newAvatarPath}/${newNameAvatar}`, (err) => {
        if (err) throw err;
    })

    const newUrl = `${url}/${newNameAvatar}`
    await user.updateOne({ avatarURL: newUrl });
}

module.exports = {
    registerUser,
    loginUser,
    updateAvatar
}