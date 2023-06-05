const { default: mongoose } = require("mongoose");
const passportLocalMongoose=require('passport-local-mongoose')

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        
    },
    mobile:{
        type:String,
        required:true
    },
  })
  UserSchema.plugin(passportLocalMongoose);
  module.exports=mongoose.model('UserSchema',UserSchema);