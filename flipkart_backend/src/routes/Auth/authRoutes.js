const express = require("express");
const router = express.Router();
const authController = require("../../controllers/mainControllers").AuthManagement

router.post('/signin', authController.signInUser)

router.post('/signup', authController.signUpUser)

router.post('/admin/signin', authController.signInAdmin)

router.post('/admin/signup', authController.signUpAdmin)

module.exports = router;