const express = require('express')
const router = express.Router()

const { validateUser, validateVerification } = require('../../validation/userValidation')

const {
    registerUserController,
    loginUserController,
    logoutUserController,
    getCurrentUserController,
    updateAvatarController,
    getVerificationTokenController,
    sendVerificationRequestController
} = require('../../controllers/users')

const { asyncWrapper } = require('../../helpers/apiHelpers')
const { authMiddleware } = require('../../middlewares/authMiddleware')
const { uploadMiddleware } = require('../../middlewares/uploadMiddleware')

router.post('/signup', validateUser, asyncWrapper(registerUserController))
router.post('/login', validateUser, asyncWrapper(loginUserController))
router.post('/logout', authMiddleware, asyncWrapper(logoutUserController))
router.get('/current', authMiddleware, validateUser, asyncWrapper(getCurrentUserController))
router.patch('/avatars', authMiddleware, uploadMiddleware.single('avatar'), asyncWrapper(updateAvatarController));
router.get('/verify/:verificationToken', asyncWrapper(getVerificationTokenController))
router.post('/verify', validateVerification, asyncWrapper(sendVerificationRequestController))

module.exports = router