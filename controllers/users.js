const {
    registerUser,
    loginUser,
    updateAvatar,
    getVerificationToken,
    sendVerificationRequest
} = require('../services/userService')

const registerUserController = async (req, res) => {
    const { email, password } = req.body;
    const user = await registerUser(email, password);

    res.status(201).json({ user })
}

const loginUserController = async (req, res) => {
    const { email, password } = req.body;
    const user = await loginUser(email, password);

    res.status(200).json({ user })
}

const logoutUserController = async (req, res) => {
    await req.user.updateOne({ token: null })

    res.json({ message: 'No content' });
}

const getCurrentUserController = async (req, res) => {
    const { email, subscription } = req.user
    res.json({ email, subscription })
}

const updateAvatarController = async (req, res) => {
    const { user, file, originalUrl } = req;
    await updateAvatar(user, file, originalUrl);

    const { avatarURL } = user;
    res.json({ avatarURL })
}

const getVerificationTokenController = async (req, res) => {
    const { verificationToken } = req.params;
    await getVerificationToken(verificationToken);

    res.json({ message: 'Verification successful' })
}

const sendVerificationRequestController = async (req, res) => {
    const { email } = req.body;
    await sendVerificationRequest(email);

    res.json({ 'message': 'Verification email sent' })
}


module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getCurrentUserController,
    updateAvatarController,
    getVerificationTokenController,
    sendVerificationRequestController
}