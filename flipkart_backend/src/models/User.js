const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    hash_password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    contact_number: {
        type: String,
        required: true,
        min: 10,
        max: 16
    },
    profile_picture: {
        type: String
    }
}, { timestamps: true })

userSchema.virtual('password').set(function (password) {
    this.hash_password = bcrypt.hashSync(password, 10)
})

userSchema.methods = {
    authenticate: function (password) {
        return bcrypt.compareSync(password, this.hash_password) // either return "true or "false
    }
}

module.exports = mongoose.model('User', userSchema);