const express = require('express')
const router = express.Router()

const { validateUser } = require('../../validation/userValidation')

const {
    registerUserController,
    loginUserController,
    logoutUserController,
    getCurrentUserController
} = require('../../controllers/users')

const { asyncWrapper } = require('../../helpers/apiHelpers')
const { authMiddleware } = require('../../middlewares/authMiddleware')

router.post('/signup', validateUser, asyncWrapper(registerUserController))
router.post('/login', validateUser, asyncWrapper(loginUserController))
router.post('/logout', authMiddleware, asyncWrapper(logoutUserController))
router.get('/current', authMiddleware, validateUser, asyncWrapper(getCurrentUserController))

module.exports = router