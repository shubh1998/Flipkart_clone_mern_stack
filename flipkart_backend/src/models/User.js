const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 20,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 20
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
    password: {
        type: String,
        required: true,
        minlength: 7,
        maxlength: 100,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    contact_number: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 16
    },
    profile_picture: {
        type: String
    },
    auth_token: {
        type: String
    }
}, { timestamps: true })

//Created virtual key
userSchema.virtual('fullname').get(function () {
    return `${this.firstname} ${this.lastname} `
})

//Hash the passsword before saving
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10)
    }
    next()
})

//Created static methods
userSchema.methods = {

    authenticate: function (password) {
        const user = this
        return bcrypt.compare(password, user.password)  // either return "true or "false
    },
    generateAuthToken: async function () {
        const user = this;
        const payload = {
            _id: user._id.toString(),
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            email: user.email,
            role: 'user'
        }
        const authToken = await jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
        user.auth_token = authToken
        await user.save();
        return authToken;
    }
}

const User = mongoose.model('User', userSchema);

module.exports = User;