const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
   
    },
    disc:{
        type:String,
        require:true,
        
    },
    important:{
        type:Boolean,
        default:false,
    },
    complete:{
        type:Boolean,
        default:false,
    },
    
},{timestamps:true});

module.exports = mongoose.model("Task",TaskSchema);
