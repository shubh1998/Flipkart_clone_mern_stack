const express = require("express");
const router = express.Router();
const authController = require("../../controllers/mainControllers").AuthManagement

router.get('/signin', authController.signInUser)

router.post('/signup', authController.signUpUser)

module.exports = router;