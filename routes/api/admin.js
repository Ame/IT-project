const express = require("express");
const router = express.Router();
const AdminCtrl = require("../../controllers/admin.js");
const passport = require('passport');
require('../../middleware/passport')(passport)


// @route get api/users/admin/viewUsers
// @desc Gives a list of all the users
// @access Public
router.get("/viewUsers",passport.authenticate('jwt', {session: false}),authRole("admin"),AdminCtrl.apiViewUsers);

// @route get api/users/admin/editUser
// @desc Change permissions of specified user
// @access Public
router.put("/editUser/:email",passport.authenticate('jwt', {session: false}),authRole("admin"),AdminCtrl.apiViewUsers);

// @route get api/users/adminDeleteuser
// @desc Deletes a specified user
// @access Public
router.delete("/deleteUser/:email",passport.authenticate('jwt', {session: false}),authRole("admin"),AdminCtrl.apiDeleteUser);

// function to auth admin
function authRole(role){
    return (req,res,next) => {
        console.log(req.user)
        if (req.user.role == role){
            return next();
        }
        // user not role
        return res.status(401).json({msg:"Not allowed"})
    }
}
module.exports = router