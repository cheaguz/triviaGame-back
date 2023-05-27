const mongoose = require('../bin/db');


const rankingSchema = new mongoose.Schema({
    id_user : {
        type: mongoose.Schema.ObjectId,
        ref:"user",
        required : true,
        unique : true
    },
    points : {
        type : Number,
        required : true
    },
    best_time : {
        type : Number,
        required : true,
    },
});

module.exports = mongoose.model("ranking", rankingSchema);
