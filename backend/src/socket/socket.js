import { Server } from 'socket.io'

let io;

export const initSocket = (server) => {
    io = new Server(server, {
        cors: { origin: "*" },
    })

    io.on("connection", (socket) => {
        console.log("User Connected");

        socket.on("joinGroup", (groupId) => {
            socket.join(groupId);
        })
    })
}

export const emitUpdate = (groupId, data) => {
    if (io) {
        io.to(groupId).emit("update", data);
    }
}