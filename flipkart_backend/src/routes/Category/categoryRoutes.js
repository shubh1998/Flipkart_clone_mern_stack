const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/mainControllers").CategoryManagement

// ----------Using passport for authentication---------
// const passport = require("passport");
// require("../../middleware/passport");

router.post('/category/create', categoryController.createCategory)

// router.get('/demo', passport.authenticate("jwt", { session: false }), (req, res)=>{
//     res.json({
//         message: 'Hi Authentication complete',
//         user: req.user
//     })
// })

module.exports = router;