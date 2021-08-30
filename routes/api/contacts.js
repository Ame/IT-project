const express = require("express");
const router = express.Router();
const UsersCtrl = require("../../controllers/contacts.js");
const passport = require('passport');
require('../../middleware/passport')(passport)

// @route POST api/contacts/addContact
// @desc Register contact
// @access Private
router.post("/add", passport.authenticate('jwt', {session: false}), ContactsCtrl.apiAddContact);

// @route GET api/contacts/getContacts
// @desc Gets all Contacts
// @access Private
router.get('/', async (req, res) => {
    const contacts = await Contact.find({ user: req.user.id }).sort({date: -1});
    res.json(contacts);
});

module.exports = router