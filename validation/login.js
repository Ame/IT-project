// All of this code handles validation for logins
const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(user) {
    let errors = {};
    user.email = !isEmpty(user.email) ? user.email : "";
    user.password = !isEmpty(user.password) ? user.password : "";
    
    // Email checks
    if (Validator.isEmpty(user.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(user.email)) {
        errors.email = "Email is invalid";
    }
    // Password checks
    if (Validator.isEmpty(user.password)) {
        errors.password = "Password field is required";
    }
    // return any errors if present 
    return {
      errors,
      isValid: isEmpty(errors)
    };
};