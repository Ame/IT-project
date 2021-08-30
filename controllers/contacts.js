const User = require("../models/Contacts.js");
const validateRegister = require("../validation/addContact");

module.exports =  class UsersController {
    static async apiAddContact(req,res){
        const { errors, isValid } = validateContact(req.body);
        // Check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }
        Contact.findOne({ email: req.body.email , req.user.id}).then(contact => {
            // User already exists
            if (contact) return res.status(400).json({ msg: "Contact already exists" });

            // Create new user
            const newContact = new Contact({
                name: req.body.name,
                email: req.body.email,
                user: req.user.id
            });
        })
    }
}