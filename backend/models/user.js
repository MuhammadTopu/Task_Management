const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        unique:true,
    },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }]
});

module.exports = mongoose.model("user",userSchema);
