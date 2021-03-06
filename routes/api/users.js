const express = require("express");
const router = express.Router();
const UsersCtrl = require("../../controllers/users.js");
const passport = require("passport");
require("../../middleware/passport")(passport);

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", UsersCtrl.apiRegisterUser);

// @route POST api/users/login
// @desc Login user
// @access Public
router.post("/login", UsersCtrl.apiLoginUser);

// route to test that passport authentication middleware verifies correctly
// passport.authenticate is called before callback to check auth
router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user);
    res.status(200).json({ success: true, msg: "You are authorized!" });
  }
);

// @route POST api/users/editProfile
// @desc Edit the users profile
// @access Private
router.put(
  "/editProfile",
  passport.authenticate("jwt", { session: false }),
  UsersCtrl.apiEditProfile
);

module.exports = router;
