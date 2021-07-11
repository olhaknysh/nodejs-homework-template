const {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser
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
    const { _id } = req.user;
    await logoutUser(_id);

    res.json({ message: 'No content' });
}

const getCurrentUserController = async (req, res) => {
    const { _id } = req.user;
    const { email, subscription } = await getCurrentUser(_id);

    res.json({ email, subscription })
}

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getCurrentUserController
}