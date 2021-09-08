const express = require("express");
const router = express.Router();
const passport = require('passport');
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

module.exports = router