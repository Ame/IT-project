const User = require("../models/Users.js");

module.exports =  class AdminController {

    static async apiViewUsers(req,res,next){
        // returns all users in the database
        User.find({}).then(users => {
            res.status(200).json({success:true,users:users})
        })
        .catch()
    }
}