const User = require("../models/Users.js");

module.exports =  class AdminController {

    static async apiViewUsers(req,res,next){
        // returns all users in the database
        User.find({}).then(users => {
            res.status(200).json({success:true,users:users})
        })
        .catch()
    }

    static async apiDeleteUser(req,res){
        const email = req.params.email
        // delete the user with the email
        User.deleteOne({email:email}).then(user => {
            res.status(200).json({success:true,user:user})
        })
        .catch(err => res.status(400).json({errors:err}))
    }

    static async apiEditUser(req,res){
        const email = req.params.email
        const role = req.body.role
        // edit the user with the email
        User.findOneAndUpdate({email:email},{role:role}).then(user => {
            res.status(200).json({success:true,user:user})
        })
        .catch(err => res.status(400).json({errors:err}))


    }

}