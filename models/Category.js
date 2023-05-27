const mongoose = require('../bin/db');


const CategorySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
});

module.exports = mongoose.model("category", CategorySchema);
