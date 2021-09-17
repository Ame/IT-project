const express = require("express");
const router = express.Router();
const passport = require('passport');
const ContactsCtrl = require("../../controllers/contacts.js");
require('../../middleware/passport')(passport)

// @route POST api/contacts/addContact
// @desc Register contact
// @access Private
router.post("/addContact", passport.authenticate('jwt', {session: false}), ContactsCtrl.apiAddContact);

// @route GET api/contacts/getContacts
// @desc Gets all Contacts
// @access Private
router.get('/getContacts', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const contacts = await Contact.find({ user: req.user.id }).sort({date: -1});
    res.json(contacts);
});

// @route GET api/contacts/getContact
// @desc Gets a specific Contact
// @access Private
router.get('/getContact', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const contacts = await Contact.find({ user: req.user.id, email: req.body.email});
    res.json(contacts);
});


// @route POST api/contacts/addTag
// @desc Add tag(s) to the contact
// @access Private
router.put("/addTag",passport.authenticate('jwt', {session: false}),ContactsCtrl.apiAddTag);

// @route POST api/contacts/deleteTag
// @desc Remove tag(s) from contact
// @access Private
router.put("/deleteTag",passport.authenticate('jwt', {session: false}),ContactsCtrl.apiDeleteTag);


// @route POST api/contacts/getContactTag
// @desc Get contacts with specified tags
// @access Private
router.get("/getContactTag",passport.authenticate('jwt', {session: false}),ContactsCtrl.apiGetContactTag);

module.exports = router