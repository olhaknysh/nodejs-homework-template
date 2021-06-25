const fs = require('fs').promises
const path = require('path')

const contactsPath = path.join(__dirname, '/contacts.json')

const listContacts = async () => {
  try {
    const contactsList = await fs.readFile(contactsPath, 'utf8')
    const parsedContactsList = JSON.parse(contactsList)
    return parsedContactsList
  } catch (error) {
    throw error
  }
}

const getContactById = async (contactId) => {
  if (isNaN(contactId)) {
    throw new Error('Id has to be a number')
  }

  try {
    const contactsList = await listContacts()
    const contactById = contactsList.find(({ id }) => Number(contactId) === id)
    return contactById
  } catch (error) {
    throw error
  }
}

const removeContact = async (contactId) => {
  if (isNaN(contactId)) {
    throw new Error('Id has to be a number')
  }

  try {
    if (!contactId) {
      throw new Error('Please enter id')
    }

    const contactsList = await listContacts()
    const newContacts = contactsList.filter(
      (contact) => contact.id !== Number(contactId)
    )

    if (newContacts.length === contactsList.length) {
      throw new Error(`Contact with id ${contactId} does not exist`)
    }

    await fs.writeFile(contactsPath, JSON.stringify(newContacts), 'utf8')
    return newContacts
  } catch (err) {
    throw error
  }
}

const addContact = async (body) => {
  try {
    const contactsList = await listContacts()

    const { name, email, phone } = body
    const newContact = {
      id: contactsList.length + 1,
      ...body,
    }

    const possibleRepeatContact = contactsList.reduce((acc, contact) => {
      if (
        contact.name === name ||
        contact.email === email ||
        contact.phone === phone
      ) {
        return acc + 1
      }
      return acc
    }, 0)
    if (possibleRepeatContact > 0) {
      throw new Error('Please enter unique data')
    }

    contactsList.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(contactsList))
    return newContact
  } catch (err) {
    throw error
  }
}

const updateContact = async (contactId, body) => {
  try {
    const initialContact = await getContactById(contactId)
    const contactsList = await listContacts()
    const updatedContact = { ...initialContact, ...body }
    const updatedContactList = contactsList.map((contact) => {
      return contact.id === Number(contactId) ? updatedContact : contact
    })
    await fs.writeFile(contactsPath, JSON.stringify(updatedContactList), 'utf8')
    return updatedContact
  } catch (error) {
    throw error
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
