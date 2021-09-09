// All of this code handles validation for registering
const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateContact(contact){
    let errors = {};
    // Validator can only work with strings
    contact.name = !isEmpty(contact.name) ? contact.name : "";
    contact.email = !isEmpty(contact.email) ? contact.email : "";

    // Name checks
    if (Validator.isEmpty(user.name)) {
        errors.name = "Name field is required";
    }

    // Email checks
    if (Validator.isEmpty(user.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(user.email)) {
        errors.email = "Invalid Email";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}