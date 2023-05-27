const mongoose = require('mongoose');
const URLWEB = 'mongodb+srv://agu_2:1234@cluster0.hygfa.mongodb.net/?retryWrites=true&w=majority'
const URLLOCAL = 'mongodb://localhost/trivia_game'

mongoose.connect(URLLOCAL, {useNewUrlParser: true, useUnifiedTopology: true}, function (error) {
    if(error){
        throw error;
    }else{
        console.log('Conectado a MongoDB');
    }
});

module.exports = mongoose;



