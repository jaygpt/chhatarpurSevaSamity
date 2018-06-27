var mongoose = require('mongoose');

var userschema = mongoose.Schema({
    name: {
        type:String
    },
    address:{
        type:String
    },
    phone:{
        type:String
    },
    email:{
        type:String
    },
    message:{
        type:String
    }
});

var user = module.exports = mongoose.model('user', userschema);
