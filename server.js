const express=require("express");
const app=express();
app.use(express.static(__dirname+'/public'))
app.use(express.urlencoded({extended:true}));

require("dotenv").config();
const port=process.env.PORT || 3000;

const server=require("http").Server(app);
const io=require("socket.io")(server); 

const cors=require("cors");
app.use(cors());

server.listen(port,function(){
    console.log("server started");
})
app.get('/',function(req,res){
    res.sendFile("index.html");
})

const dbcon=require("./config/dbcon");
dbcon();

const userdataroutes=require("./routes/route");
app.use("/",userdataroutes);

io.on("connection",function(client){
    var uleft;
    client.on("new-user",function(name){
        console.log(name+" joined");
        uleft=name;
        client.broadcast.emit("user-joined",name);
    })
    client.on("send",function(message){
        client.broadcast.emit("receive",{message:message.msg,name:message.name1})
    });
    client.on("disconnect",function(){
        console.log(uleft);
        client.broadcast.emit("user-left",uleft);
    });
})  




