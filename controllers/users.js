const User = require("../models/Users.js");
const validateRegister = require("../validation/register");
const validateLogin = require("../validation/login");

// Class contains logic for user register and login
module.exports =  class UsersController {

static async apiRegisterUser(req,res,next){
    const { errors, isValid } = validateRegister(req.body);
        // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then(user => {
    // User already exists
    if (user) {
        return res.status(400).json({ email: "Email already exists" });
    } 
    else {
        // Create new user 
        const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
        });
        // TO-DO hash password
        newUser
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
    }
        });
}

static async apiLoginUser(req,res){
    const { errors, isValid } = validateLogin(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
}

}
