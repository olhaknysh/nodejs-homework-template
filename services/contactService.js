const { Contact } = require('../model/contactModal');
const { notFound, notCreatedContact, notUpdatedContact } = require('../helpers/errors')

const getContacts = async (userId) => {
    const contacts = await Contact.find({ userId });
    return contacts;
}

const getContactById = async (contactId) => {
    const contact = await Contact.findById(contactId);

    if (!contact) {
        throw new notFound(`Contact with id ${contactId} was not found :(`)
    }

    return contact;
}

const createContact = async ({ name, email, phone, favorite }, userId) => {
    const contact = new Contact({ name, email, phone, favorite, userId });
    if (!contact) {
        throw new notCreatedContact(`Could not create the new contact :(`)
    }
    await contact.save();
}


const removeContact = async (contactId) => {
    const contact = await Contact.findByIdAndRemove(contactId);
    if (!contact) {
        throw new notFound(`Contact with id ${contactId} was not found :(`)
    }
}

const updateContact = async (contactId, { name, email, phone }) => {
    const contact = await Contact.findByIdAndUpdate(contactId, { $set: { name, email, phone } })
    if (!contact) {
        throw new notUpdatedContact(`Could not update the contact`)
    }
}

const updateStatusContact = async (contactId, favorite) => {
    const updatedContact = await Contact.findByIdAndUpdate(contactId, { $set: { favorite } })
    if (!updatedContact) {
        throw new notUpdatedContact(`Could not update the favorite field`)
    }
}

module.exports = {
    getContacts,
    getContactById,
    createContact,
    removeContact,
    updateContact,
    updateStatusContact
}