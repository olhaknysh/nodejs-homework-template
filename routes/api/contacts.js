const express = require('express')
const router = express.Router()

const {
  getAllContactsController,
  getByIdContactController,
  createContactController,
  removeContactController,
  updateContactController,
  updateFavoriteFieldController
} = require('../../controllers/contacts')

const {
  validateCreateContact,
  validateUpdateContact,
} = require('../../validation/contactsValidation')

const { authMiddleware } = require('../../middlewares/authMiddleware')
const { asyncWrapper } = require('../../helpers/apiHelpers')

router.use(authMiddleware);

router.get('/', asyncWrapper(getAllContactsController))
router.get('/:contactId', asyncWrapper(getByIdContactController))
router.post('/', validateCreateContact, asyncWrapper(createContactController))
router.delete('/:contactId', asyncWrapper(removeContactController))
router.put('/:contactId', validateUpdateContact, asyncWrapper(updateContactController))
router.patch('/:contactId/favorite', asyncWrapper(updateFavoriteFieldController))

module.exports = router
