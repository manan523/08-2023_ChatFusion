const mongoose=require("mongoose");

const udschema=new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            maxLength:50
        },
        password:{
            type:String,
            required:true,          
            maxLength:50
        },
        email:{
            type:String,
            required:true
        }
    }
)
module.exports=mongoose.model("userdata",udschema)