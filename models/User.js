const mongoose = require('../bin/db');


const userSchema = new mongoose.Schema({
    user : {
        type : String,
        index : true
    },
    name : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
});

module.exports = mongoose.model("user", userSchema);