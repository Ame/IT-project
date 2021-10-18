const User = require("../models/Users.js");
const validateRegister = require("../validation/register");
const validateLogin = require("../validation/login");
const jwt = require("jsonwebtoken");

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
    if (user) return res.status(400).json({ message: "Email already exists" });

    // Create new user 
    const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
    });
   
    // TO-DO hash password
    newUser
    .save()
    .then(user => {
        // Create token
        const signedToken = issueToken(user);
        res.status(200).json({success:true,user:user,token:signedToken}); 
    })
    .catch(err => next(err));
})
}

static async apiLoginUser(req,res){
    const { errors, isValid } = validateLogin(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({ email }).then(user => {
        // Make sure user exists
        if (!user) {
            return res.status(404).json({ message: "Email not found" });
        }
        // hash password later
        if (password === user.password) {
            // Create token
            const signedToken = issueToken(user);
            res.status(200).json({success:true,user:user,token:signedToken}); 
        } else{
            return res.status(400).json({message: 'Invalid Credientials'});
        }
    })

    
}

static async apiEditProfile(req,res){
    const email = req.body.email
    const password = req.body.password
    const name = req.body.name
    const id = req.user.id
    // edit the user with the id 
    User.findOneAndUpdate({_id:id},{password:password,email:email,name:name},{returnOriginal:false}).then(user => {
        res.status(200).json({success:true,user:user})
    })
    .catch(err => res.status(400).json({errors:err}))


}

}


// issues a token for the user 
function issueToken(user) {
    const issued = jwt.sign(
        { id: user.id},
        process.env.TOKEN_KEY,
        {expiresIn: "2h"})
    return {token: "Bearer "+issued} 
}



