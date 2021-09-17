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
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phonenumber:{
        type:String,
        required: false
    },
    address: {
        type:String
    },
    birthday: {
        type:Date,
        required: false
    },
    notes: {
        type:String,
        required:false
    },
    tags : {
        type:Array,
        required:false
    }
});

module.exports = Contact = mongoose.model("contact", ContactSchema);