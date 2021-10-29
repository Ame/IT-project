// All of this code handles validation for registering
const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(user) {
  let errors = {};
  // Validator can only work with strings
  user.name = !isEmpty(user.name) ? user.name : "";
  user.email = !isEmpty(user.email) ? user.email : "";
  user.password = !isEmpty(user.password) ? user.password : "";

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
  // Password checks
  if (Validator.isEmpty(user.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
