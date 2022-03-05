const {isEmail} = require("validator")
const User = require("../../models/User")

const signInUser = async (req, res) => {
    const { email, password } = req.body

    if (!email) return badRequestError(res, "email is required !")
    if(!isEmail(email)) return badRequestError(res, "please enter valid email address !")
    if (!password) return badRequestError(res, "password is required !")
    if (password.length < 7 || password.length > 32) return badRequestError(res, "password should be greater than 7 digits and less than 32 digits !")

    User.findOne({ email: email }).exec(async (error, user) => {
        if (error) return badRequestError(res, "Something went wrong !")
        if (user) {
            if (user.authenticate(password)) {
                /****** Generate authenticated data and its auth_token *****/
               const authToken = await user.generateAuthToken()
               res.setHeader("Content-Type", "application/json");
               res.setHeader("AuthToken", authToken);
               res.setHeader("Access-Control-Expose-Headers", "AuthToken");
               
                let userObject = {
                    _id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    fullname: user.fullname,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    contact_number: user.contact_number,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                }
                return okResponse(res, userObject, 'User signed successfully !')
            } else {
                return badRequestError(res, "Invalid Credentials !")
            }
        } else {
            return badRequestError(res, "User not exist with this email id !")
        }

    })
}

const signUpUser = async (req, res) => {
    const { firstname, lastname, email, password, contact_number } = req.body

    if (!contact_number) return badRequestError(res, "contact_number is required !")
    if (!firstname) return badRequestError(res, "firstname is required !")
    if (!lastname) return badRequestError(res, "lastname is required !")
    if (!email) return badRequestError(res, "email is required !")
    if(!isEmail(email)) return badRequestError(res, "please enter valid email address !")
    if (!password) return badRequestError(res, "password is required !")
    if (password.length < 7 || password.length > 32) return badRequestError(res, "password should be greater than 7 digits and less than 32 digits !")
    if (contact_number.length < 10 || contact_number.length > 16) return badRequestError(res, "contact_number should be greater than 10 digits and less than 16 digits !")


    User.findOne({ email: email, role: 'user' }).exec((error, user) => {
        if (error) return badRequestError(res, "Something went wrong !")
        if (user) {
            return badRequestError(res, "Email already exist !")
        }
        const _user = new User({ firstname, lastname, email, contact_number, password, username: (firstname + lastname) })
        _user.save((err, data) => {
            if (err) return badRequestError(res, "Something went wrong !")
            return createdResponse(res, data, "User account created successfully !")
        })
    })
}

const signInAdmin = async (req, res) => {
    const { email, password } = req.body

    if (!email) return badRequestError(res, "email is required !")
    if(!isEmail(email)) return badRequestError(res, "please enter valid email address !")
    if (!password) return badRequestError(res, "password is required !")
    if (password.length < 7 || password.length > 32) return badRequestError(res, "password should be greater than 7 digits and less than 32 digits !")

    User.findOne({ email: email }).exec(async (error, user) => {
        if (error) return badRequestError(res, "Something went wrong !")
        if (user) {
            if (user.authenticate(password) && user.role === 'admin') {
                /****** Generate authenticated data and its auth_token *****/
               const authToken = await user.generateAuthToken()
               res.setHeader("Content-Type", "application/json");
               res.setHeader("AuthToken", authToken);
               res.setHeader("Access-Control-Expose-Headers", "AuthToken");
               
                let userObject = {
                    _id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    fullname: user.fullname,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    contact_number: user.contact_number,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                }
                return okResponse(res, userObject, 'Admin signed successfully !')
            } else {
                return badRequestError(res, "Invalid Credentials !")
            }
        } else {
            return badRequestError(res, "Admin not exist with this email id !")
        }

    })
}

const signUpAdmin = async (req, res) => {
    const { firstname, lastname, email, password, contact_number } = req.body

    if (!contact_number) return badRequestError(res, "contact_number is required !")
    if (!firstname) return badRequestError(res, "firstname is required !")
    if (!lastname) return badRequestError(res, "lastname is required !")
    if (!email) return badRequestError(res, "email is required !")
    if(!isEmail(email)) return badRequestError(res, "please enter valid email address !")
    if (!password) return badRequestError(res, "password is required !")
    if (password.length < 7 || password.length > 32) return badRequestError(res, "password should be greater than 7 digits and less than 32 digits !")
    if (contact_number.length < 10 || contact_number.length > 16) return badRequestError(res, "contact_number should be greater than 10 digits and less than 16 digits !")

    User.findOne({ email: email, role: 'admin' }).exec((error, user) => {
        if (error) return badRequestError(res, "Something went wrong !")
        if (user) {
            return badRequestError(res, "Email already exist !")
        }
        const _user = new User({ firstname, lastname, email, contact_number, password, username: (firstname + lastname), role: 'admin' })
        _user.save((err, data) => {
            if (err) return badRequestError(res, "Something went wrong !")
            return createdResponse(res, data, "Admin account created successfully !")
        })
    })
}

module.exports = {
    signInUser,
    signUpUser,
    signInAdmin,
    signUpAdmin
}