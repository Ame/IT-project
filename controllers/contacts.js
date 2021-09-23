const User = require("../models/Contacts.js");
const validateContact = require("../validation/addContact");

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
                notes: req.body.notes,
                tags: []
            });
            newContact
                .save()
                .then(() => {
                    return res.status(201).json({
                        success: true,
                        id: newContact._id,
                    })
                })
            })

    }
    // tested
    static async apiAddTag(req,res,next){
        Contact.findOne({ email: req.body.email , user: req.user.id}).then( contact => {

            if (!contact) {
                return res.status(404).json({ msg: "Contact not found" });
            } 
            const tags = Array.from(req.body.tags);
            const cat = tags.concat(contact.tags);
            const set = new Set(cat)
            // remove duplicates through set conversion
            const newTags = [...set]
            console.log(newTags);
            // now update the tag
            Contact.updateOne({ email: req.body.email , user: req.user.id} ,{tags: newTags}).then(result => {
                
                return res.status(200).json({success:true,tags:newTags});
            })
        })

    }
    // tested
    static async apiDeleteTag(req,res){
        // Find contact 
        Contact.findOne({ email: req.body.email , user: req.user.id}).then(contact => {
            if (!contact) {
                return res.status(404).json({ msg: "Contact not found" });
            }
            const tags = contact.tags
            console.log(tags);
            // get index of tag to remove
            const index = tags.indexOf(req.body.tag);
            tags.splice(index, 1);
            console.log(tags);
            Contact.updateOne({ email: req.body.email , user: req.user.id},{tags: tags}).then(contact => {
                res.status(200).json({success:true,tags:tags});
            })

        })

    }
    // tested
    static async apiGetContactTag(req,res){
        const tags = req.body.tags
        // get all contacts that match tags
        Contact.find( { tags: { $all: tags } }).then(contacts =>{
            res.status(200).json({success:true,contacts:contacts});
        }).catch(err=>console.log(err));

    }

    static async apiEditContact(req,res){
        console.log(req.user);
        var _id = req.body._id;
        var contact = {
            name: req.body.name,
            email: req.body.email,
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

    static async apiRemoveContact(req,res){
        console.log(req.user);
        var _id = req.body._id;
        const user = await Contact.findByIdAndRemove(_id);
        res.status(200).json({success:true});
    }
}