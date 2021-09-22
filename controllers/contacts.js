const User = require("../models/Contacts.js");
const validateRegister = require("../validation/addContact");

module.exports =  class ContactsController {
    static async apiAddContact(req,res){
        const { errors, isValid } = validateContact(req.body);
        // Check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }
        Contact.findOne({ email: req.body.email , id: req.body.id}).then(contact => {
            // Contact already exists
            if (contact) return res.status(400).json({ msg: "Contact already exists" });

            // Create new contact
            const newContact = new Contact({
                name: req.body.name,
                email: req.body.email,
                user: req.user.id,
                phone: req.body.phone,
                address: req.body.address,
                birthday: req.body.birthday,
                notes: req.body.notes
            });
        })
        newContact
            .save()
            .then(() => {
                return res.status(201).json({
                    success: true,
                    id: newContact._id,
                })
            })
    }
    static async apiAddTag(req,res,next){
        console.log(req.user);
        // Find contact 
        Contact.findOne({ email: req.user.email , ref: req.user.id}).then(contact => {
            if (!contact) {
                return res.status(404).json({ msg: "Contact not found" });
            }

            // update tags
            const tags = req.body.tags
            const newTags = [...new Set(tags.concat(contact.tags))]
            // remove duplicates through set conversion
            Contact.updateOne({ email: req.user.email , ref: req.user.id}
                ,{tags: newTags});

            res.status(200).json({success:true,contact:contact}); 
        }).catch(err => next(err,null))

    }
    static async apiDeleteTag(req,res){
        console.log(req.user);
        // Find contact 
        Contact.findOne({ email: req.user.email , ref: req.user.id}).then(contact => {
            if (!contact) {
                return res.status(404).json({ msg: "Contact not found" });
            }
        })
        const tags = contact.tags
        // get index of tag to remove
        const index = tags.indexOf(req.body.tag);
        if (index > -1) {
            tags.splice(index, 1);
        }
        Contact.updateOne({ email: req.user.email , ref: req.user.id}
            ,{tags: tags});

        res.status(200).json({success:true,contact:contact}); 
    }

    static async apiEditContact(req,res){
        console.log(req.user);
        var _id = req.body._id;
        var contact = {
            name: req.body.name,
            email: req.body.email,
            user: req.user.id,
            phone: req.body.phone,
            address: req.body.address,
            birthday: req.body.birthday,
            notes: req.body.notes
        };
        Contact.findByIdAndUpdate(_id, { $set: contact }, { new: true }, function (err, contact) {
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