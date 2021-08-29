const express = require("express");
const router = express.Router();
const UsersCtrl = require("../../controllers/users.js");
const passport = require('passport');
require('../../middleware/passport')(passport)


// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register",UsersCtrl.apiRegisterUser);

// @route POST api/users/login
// @desc Login user
// @access Public
router.post("/login", UsersCtrl.apiLoginUser);

// route to test that passport authentication middleware verifies correctly
// passport.authenticate is called before callback to check auth
router.get('/protected',passport.authenticate('jwt', {session: false}), (req,res,next) =>{
    res.status(200).json({success:true,msg :'You are authorized!'});
});

module.exports = router