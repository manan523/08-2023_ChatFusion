var socket=io();
var noti=new Audio("noti.mp3");
fetch('/getjson')
   .then(response => response.json())
   .then(function(json){
        let name1=json.username;
        document.querySelector(".header h2").innerHTML=`Hi, ${name1} ! <a href="/">(Sign Out?)</a>`;
        socket.emit("new-user",name1);

        $(".btn").click(function(){
            let msg=$("input").val();
            if(msg!=""){
                console.log("written");
                $(".chatbox").append(`<div class="sen">
                <p class="user">You</p><br>
                <p class="senp">${msg}</p>
                </div>`);
                $("input").val("");
                socket.emit("send",{name1,msg});
            }
        });
        $("input").keydown(function(e){
            if(e.key=="Enter"){
                let msg=$("input").val();
                if(msg!=""){
                    console.log("written");
                    $(".chatbox").addClass("right");
                    $(".chatbox").append(`<div class="sen">
                    <p class="user">You</p><br>
                    <p class="senp">${msg}</p>
                    </div>`);
                    $("input").val("");
                    socket.emit("send",{name1,msg});
                }
            }
        });
    });

socket.on("user-joined",function(uname){
    $(".chatbox").append(`<div>
        <h6> ${uname} joined the chat!</h6><br>
        </div>`);
});
socket.on("user-left",function(uname){
    $(".chatbox").append(`<div>
        <h6> ${uname} left the chat!</h6><br>
        </div>`);
});
socket.on("receive",function(data){
    $(".chatbox").append(`<div class="rec">
    <p class="user">${data.name}</p><br>
    <p class="recp">${data.message}</p>
    </div>`);
    noti.play();
});

