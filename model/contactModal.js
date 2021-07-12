const mongoose = require('mongoose');
const { Schema, SchemaTypes } = mongoose;

const { User } = require('./userModal.js')

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: String,
    }
})

const Contact = mongoose.model('contact', contactSchema);

module.exports = { Contact };