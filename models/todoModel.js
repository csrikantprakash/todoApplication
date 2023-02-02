const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    task : {type:String, required:true},
    timeTaken : {type:String},
    status: {type:String, default:"Pending"}
})

module.exports = new mongoose.model("Todo", TodoSchema);