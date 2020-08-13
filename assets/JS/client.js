const socket = io('http://localhost:8000');

const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer =document.querySelector(".messageContainer");
var audio=new Audio("assets/ting.mp3");

const append = (message, position) =>{
    const messageelement = document.createElement("div");
    messageelement.innerText = message;
    messageelement.classList.add("message");
    messageelement.classList.add(position);
    messageContainer.append(messageelement);
    if(position=='left'){
        audio.play();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, "right");
    socket.emit("send", message);
    messageInput.value=" ";
})

const name = prompt("Enter your name to join");
socket.emit("new-user-joined",name);
if(name != "")
{
    socket.on("user-joined", name=>{
        append(`${name} joined the chat` , "left")
    });
}
else{
    alert("Enter name");
    const name = prompt("Enter your name to join");
}

socket.on("recieve", data=>{
    append(`${data.name} : ${data.message}` , "left")
});

socket.on("left",name => {
    append(`${name}: left the chat`, "left");
})
