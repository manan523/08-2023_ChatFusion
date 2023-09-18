const mongoose=require("mongoose");
require("dotenv").config();
const dbcon=function(){
    mongoose.connect(process.env.db_url,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(function(){
        console.log("Connection to DB successful")
    }).catch(function(error){
        console.log("ERROR connecting to DB");
        console.log(error.message);
        process.exit(1);
    });
}
module.exports=dbcon;