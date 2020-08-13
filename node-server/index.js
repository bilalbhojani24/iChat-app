// server-side programming
const io = require("socket.io")(8000)

const users = {};

io.on("connection", socket=>{
    socket.on("new-user-joined", name =>{
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
    });
    socket.on("send", message => {
        socket.broadcast.emit("recieve",{message : message, name:users[socket.id]})
    });
    socket.on("disconnect", message => {
        socket.broadcast.emit("left",users[socket.id]);
        delete users[socket.id];
    });
    

})


//socket.on = It will listen the incoming events
// socket.broadcast() = It will push the data to everyone
// socket.broadcast.emit() = It will push the data to everyone except sender
