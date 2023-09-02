const { Server } = require("socket.io");
const io = new Server({ cors: "http://localhost:5173" });
let onlineUser = [];
io.on("connection", (socket) => {
    socket.on("addNewUser", (userId) => {
        if (!onlineUser.some((user) => user.userId == userId)) {
            onlineUser.push({
                userId, socketId: socket.id
            })
        }
        io.emit("getOnlineUser", onlineUser)
    })
    socket.on("sendMessage",(message)=>{
        const isOnline=onlineUser.filter((user)=>user.userId==message.recipientId)
        if(!isOnline) return;
        // io.to(isOnline.socketId).emit("getMessage",message);
    })
    socket.on("disconnect", () => {
        onlineUser = onlineUser.filter((user) => user.socketId !== socket.id);
        io.emit("getOnlineUser", onlineUser)
    })
})



io.listen(3000)