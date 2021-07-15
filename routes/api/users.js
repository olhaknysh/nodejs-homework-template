const express = require('express')
const router = express.Router()

const { validateUser } = require('../../validation/userValidation')

const {
    registerUserController,
    loginUserController,
    logoutUserController,
    getCurrentUserController,
    updateAvatarController
} = require('../../controllers/users')

const { asyncWrapper } = require('../../helpers/apiHelpers')
const { authMiddleware } = require('../../middlewares/authMiddleware')
const { uploadMiddleware } = require('../../middlewares/uploadMiddleware')

router.post('/signup', validateUser, asyncWrapper(registerUserController))
router.post('/login', validateUser, asyncWrapper(loginUserController))
router.post('/logout', authMiddleware, asyncWrapper(logoutUserController))
router.get('/current', authMiddleware, validateUser, asyncWrapper(getCurrentUserController))
router.patch('/avatars', authMiddleware, uploadMiddleware.single('avatar'), asyncWrapper(updateAvatarController));

module.exports = router