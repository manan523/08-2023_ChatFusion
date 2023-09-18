const mongoose = require("mongoose");
const udschema = require("../models/model");
const fs=require('fs');
let data=null;

module.exports.registeruser=function(req,res){
    try{    
        const{
            username,password,email
        }=req.body;
        udschema.create({
            username,password,email
        });
        res.sendFile(__dirname+"/regsuccess.html");
    }catch(err){
        console.log("Error registering the user !");
    }
}
module.exports.loginuser=async function(req,res){
    try{    
        const uname=req.body.username; 
        const pass=req.body.password;   
        data=await udschema.findOne({username:uname,password:pass}); 
        if(data==null){
            res.send("<h1> User not found. Please Go Back and Register");
        }
        else{
            res.sendFile(__dirname+"/chat.html");
        }
    }catch(err){
        console.log("Error registering the user !");
    }
}
module.exports.getjson=async function given(req,res){
    try{       
        res.send(data);
    }catch(err){
        console.log("Error");
    }
}
