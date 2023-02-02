const mongoose = require("mongoose");

const RegisterSchema = new mongoose.Schema({
    username : {type:String, required:true},
    password : {type:Number, required:true}
})

module.exports = new mongoose.model("Register", RegisterSchema);