const express = require("express");
const router = express.Router();
const passport = require('passport');
const ContactsCtrl = require("../../controllers/contacts.js");
require('../../middleware/passport')(passport)

// @route POST api/contacts/addContact
// @desc Register contact
// @access Private
router.post("/", passport.authenticate('jwt', {session: false}), ContactsCtrl.apiAddContact);

// @route GET api/contacts/getContacts
// @desc Gets all Contacts
// @access Private
router.get('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const contacts = await Contact.find({ user: req.user.id }).sort({date: -1});
    res.json(contacts);
});

// @route GET api/contacts/getContacts
// @desc Gets a specific Contact
// @access Private
router.get('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const contacts = await Contact.find({ user: req.user.id, email: req.body.email});
    res.json(contacts);
});


// @route POST api/contacts/addTag
// @desc Add tag(s) to the contact
// @access Private
router.post("/addTag",passport.authenticate('jwt', {session: false}),ContactsCtrl.apiAddTag);

// @route POST api/contacts/deleteTag
// @desc Remove tag(s) from contact
// @access Private
router.post("/deleteTag",passport.authenticate('jwt', {session: false}),ContactsCtrl.apiDeleteTag);


// @route POST api/contacts/getContactTag
// @desc Remove tag(s) from contact
// @access Private
router.post("/getContactTag",passport.authenticate('jwt', {session: false}),ContactsCtrl.apiGetContactTag);

module.exports = router