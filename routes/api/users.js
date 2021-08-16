const express = require("express");
var router = express.Router();
const UsersCtrl = require("../../controllers/users.js");

// Most of these packages will be used later for hashing and token stuff
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");


// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register",UsersCtrl.apiRegisterUser );

// @route POST api/users/login
// @desc Login user
// @access Public
// router.post("/login", UsersCtrl.apiLoginUser);

module.exports = router