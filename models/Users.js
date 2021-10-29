const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// User Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "basic",
  },
  font: {
    type: String,
    required: true,
    default: "default",
  },
});

module.exports = User = mongoose.model("users", UserSchema);
