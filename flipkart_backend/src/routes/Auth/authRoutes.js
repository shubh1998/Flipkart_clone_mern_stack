const express = require("express");
const router = express.Router();
const authController = require("../../controllers/mainControllers").AuthManagement

// ----------Using passport for authentication---------
const passport = require("passport");
require("../../middleware/passport");

router.post('/signin', authController.signInUser)

router.post('/signup', authController.signUpUser)

router.post('/admin/signin', authController.signInAdmin)

router.post('/admin/signup', authController.signUpAdmin)

router.get('/demo', passport.authenticate("jwt", { session: false }), (req, res)=>{
    res.json({
        message: 'Hi Authentication complete',
        user: req.user
    })
})

module.exports = router;