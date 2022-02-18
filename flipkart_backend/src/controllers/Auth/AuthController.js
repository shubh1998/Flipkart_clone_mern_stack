const User = require("../../models/User")

const signInUser = async (req, res) => {
    return okResponse(res, 1, "GET request of signin")
}

const signUpUser = async (req, res) => {
    const { firstname, lastname, email, password, contact_number } = req.body

    if(!contact_number) return badRequestError(res, "contact_number is required !")
    if(!firstname) return badRequestError(res, "firstname is required !")
    if(!lastname) return badRequestError(res, "lastname is required !")
    if(!email) return badRequestError(res, "email is required !")
    if(!password) return badRequestError(res, "password is required !")

    User.findOne({ email: email }).exec((error, user) => {
        if (user) {
            return badRequestError(res, "Email already exist !")
        }
        const _user = new User({firstname, lastname, email, contact_number, password, username: Math.random().toString()})
        _user.save((err, data) => {
            if(err) return badRequestError(res, "Something went wrong !")
            return createdResponse(res, data, "User account created successfully !")
        })
    })
}

module.exports = {
    signInUser,
    signUpUser
}