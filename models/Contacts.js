const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// User Schema
const ContactSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    tags :{
        
    }
});

module.exports = Contact = mongoose.model("contact", ContactSchema);