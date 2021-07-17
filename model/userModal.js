const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const { Schema } = mongoose;

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: null,
    },
    avatarURL: String,
    verify: {
        type: Boolean,
        default: false,
    },
    verifyToken: {
        type: String,
        required: [true, 'Verify token is required'],
    },
})

userSchema.pre('save', async function () {
    if (this.isNew || this.isModified) {
        this.password = await bcrypt.hash(this.password, 10)
    }
})

const User = mongoose.model('user', userSchema);

module.exports = { User };