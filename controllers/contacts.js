const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../model/index')

const getAll = async (req, res, next) => {
  try {
    const contactsList = await listContacts()
    res.status(200).json({
      status: 'success',
      code: 200,
      data: { contactsList },
    })
  } catch (err) {
    next(err)
  }
}

const getById = async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId)
    if (contact) {
      return res.status(200).json({
        status: 'success',
        code: 200,
        data: { contact },
      })
    } else {
      return next({
        status: 404,
        message: `Contact with id ${req.params.contactId} is not found`,
        data: 'Not found',
      })
    }
  } catch (err) {
    return next(err)
  }
}

const create = async (req, res, next) => {
  try {
    const newContact = await addContact(req.body)

    res.status(201).json({
      status: 'success',
      code: 201,
      data: { newContact },
    })
  } catch (err) {
    return next(err)
  }
}

const remove = async (req, res, next) => {
  try {
    const renewedContacts = await removeContact(req.params.contactId)
    res.status(200).json({
      status: 'success',
      code: 200,
      data: { renewedContacts },
    })
  } catch (err) {
    return next(err)
  }
}

const update = async (req, res, next) => {
  try {
    const contact = updateContact(req.params.contactId, req.body)
    if (contact) {
      return res.status(200).json({
        status: 'success',
        code: 200,
        data: {
          contact,
        },
      })
    } else {
      return next({
        status: 404,
        message: `Contact with id ${req.params.contactId} is not found`,
        data: 'Not Found',
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
}
