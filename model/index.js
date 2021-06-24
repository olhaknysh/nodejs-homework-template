const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join(__dirname, '/db/contacts.json')

const listContacts = async () => {
  try {
    const contactsList = await (await fs.readFile(contactsPath)).toString()
    return JSON.parse(contactsList)
  } catch (error) {
    console.error(error.message)
  }
}

const getContactById = async (contactId) => {
  if (isNaN(contactId)) {
    console.warn('Id has to be a number')
    return
  }

  try {
    const contactsList = await (await fs.readFile(contactsPath)).toString()
    const parsedContactsList = JSON.parse(contactsList)
    const contact = await parsedContactsList.filter(contact => contact.id === contactId)
    return contact
  } catch (error) {
    console.error(error.message)
  }
}

const removeContact = async (contactId) => {
  if (isNaN(contactId)) {
    console.warn('Id has to be a number')
    return
  }

  try {
    if (!contactId) {
      throw new Error('Please enter id')
    }

    const contactsList = await (await fs.readFile(contactsPath)).toString()
    const parsedContactsList = JSON.parse(contactsList)
    const newContacts = parsedContactsList.filter(contact => contact.id !== contactId)

    if (newContacts.length === parsedContactsList.length) {
      throw new Error(`Contact with id ${contactId} does not exist`)
    }

    await fs.writeFile(contactsPath, JSON.stringify(newContacts))
    return newContacts
  } catch (err) {
    console.error(err.message)
  }
}

const addContact = async (body) => {
  try {
    const contactsList = await (await fs.readFile(contactsPath)).toString()
    const parsedContactsList = JSON.parse(contactsList)

    const { name, email, phone } = body
    const newContact = {
      id: parsedContactsList.length + 1,
      name,
      email,
      phone,
    }

    const possibleRepeatContact = parsedContactsList.reduce((acc, contact) => {
      if (contact.name === name || contact.email === email || contact.phone === phone) {
        return acc + 1
      }
      return acc
    }, 0)
    if (possibleRepeatContact > 0) {
      throw new Error('Please enter unique data')
    }

    parsedContactsList.push(newContact)
    fs.writeFile(contactsPath, JSON.stringify(parsedContactsList))
    return newContact
  } catch (err) {
    console.error(err.message)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const contactList = await listContacts()
    const changedContact = await getContactById(contactId)
    const changedContactList = contactList.map(contact => Number(contactId) === contact.id ? { ...changedContact, ...body } : contact)
    await fs.writeFile(contactsPath, JSON.stringify(changedContactList))
    return changedContactList
  } catch (error) {
    console.error(error.message)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
}
