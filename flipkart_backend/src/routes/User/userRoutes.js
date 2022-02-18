const express = require("express");
const router = express.Router();
const userController = require("../../controllers/mainControllers").UserManagement

router.get('/signin', userController.signInUser)

router.post('/signup', userController.signUpUser)

module.exports = router;