const express = require("express");
const router = express.Router();
const AdminCtrl = require("../../controllers/admin.js");
const passport = require("passport");
require("../../middleware/passport")(passport);

// @route get api/users/admin/viewUsers
// @desc Gives a list of all the users
// @access Public
router.get(
  "/viewUsers",
  passport.authenticate("jwt", { session: false }),
  authRole("admin"),
  AdminCtrl.apiViewUsers
);

// @route get api/admin/editUser
// @desc Change permissions of specified user
// @access Public
router.put(
  "/editUser",
  passport.authenticate("jwt", { session: false }),
  authRole("admin"),
  AdminCtrl.apiEditUser
);

// @route get api/admin/deleteUser
// @desc Deletes a specified user
// @access Public
router.delete(
  "/deleteUser/:email",
  passport.authenticate("jwt", { session: false }),
  authRole("admin"),
  AdminCtrl.apiDeleteUser
);

// function to auth admin
function authRole(role) {
  return (req, res, next) => {
    console.log(req.user);
    if (req.user.role == role) {
      return next();
    }
    // user not role
    return res.status(401).json({ msg: "Not allowed" });
  };
}

// @route GET api/contacts/getUser
// @desc Gets a specific User
// @access Private
router.get(
  "/getUser",
  passport.authenticate("jwt", { session: false }),
  authRole("admin"),
  async (req, res) => {
    const user = await User.find({ email: req.body.email });
    res.json(user);
  }
);

module.exports = router;
