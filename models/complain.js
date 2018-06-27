var mongoose = require('mongoose');

var userschema = mongoose.Schema({
    name: {
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    message:{
        type:String
    }
});

var complain = module.exports = mongoose.model('complain', userschema);
