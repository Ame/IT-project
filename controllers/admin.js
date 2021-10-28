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
        console.log(req.user);
        var _id = req.body._id;
        var user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        };
        // Find the user by id and update values accordingly
        User.findByIdAndUpdate(_id, { $set: user }, { new: true }, function (err, user) {
            if (err) {
                res.status(500);
                res.send(err);
            } else {
                res.status(200);
                res.send();
            }
        });
    }

}
