const mongoose = require('../bin/db');


const QuestionsSchema = new mongoose.Schema({
    id_category : {
        type: mongoose.Schema.ObjectId,
        ref:"category"
    },
    question : {
        type : String,
        required : true
    },
    correctAnswer : {
        type : String,
        required : true,
    },
    answers : {
        type : [String],
        required : true,
    },
    image : {
        type : String ,
        required : true
    },
    level : {
        type : Number,
        required : true

    }
});

module.exports = mongoose.model("questions", QuestionsSchema);


