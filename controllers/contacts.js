const { getContacts,
  getContactById,
  createContact,
  removeContact,
  updateContact,
  updateStatusContact } = require('../services/contactService')
const { noFavoriteField } = require('../helpers/errors')

const getAllContactsController = async (req, res) => {
  const contacts = await getContacts();
  res.json({ contacts, status: 'success' })
}

const getByIdContactController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  res.json({ contact, status: 'success' });
}

const createContactController = async (req, res) => {
  const {
    name, email, phone, favorite
  } = req.body;
  await createContact({ name, email, phone, favorite });
  res.json({ status: 'success' });
}

const removeContactController = async (req, res) => {
  const { contactId } = req.params;
  await removeContact(contactId);
  res.json({ status: 'success' });
}

const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const {
    name, email, phone
  } = req.body;
  await updateContact(contactId, { name, email, phone })
  res.json({ status: 'success' });
}

const updateFavoriteFieldController = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (!favorite) {
    throw new noFavoriteField("missing field favorite")
  }
  const updatedContact = await updateStatusContact(contactId, favorite)

  res.json({ updatedContact, status: 'success' })
}

module.exports = {
  getAllContactsController,
  getByIdContactController,
  createContactController,
  removeContactController,
  updateContactController,
  updateFavoriteFieldController
}
