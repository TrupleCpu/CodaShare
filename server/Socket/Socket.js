const { Server } = require('socket.io');
const express = require('express');
const app = express();
const user = require('../Collections/UserCollection');
const server = app.listen(5001, () => {
    console.log('Socket listening~~~~~~');
});

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    }
});

let onlineUsers = {};

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('userOnline', (userID) => {

            onlineUsers[userID] = socket.id;
            io.emit('onlineUsers', Object.keys(onlineUsers));
            console.log('Online users:', Object.keys(onlineUsers));   
    });

    socket.on('joinRoom', (groupId) => {
        socket.join(groupId);
        console.log(`Socket ${socket.id} joined room ${groupId}`);
    });

    socket.on('disconnect', async () => {
        console.log(`User disconnected: ${socket.id}`);

        const userID =  Object.keys(onlineUsers).find(
            (key) => onlineUsers[key] === socket.id
        );

            delete onlineUsers[userID];
            io.emit('onlineUsers', Object.keys(onlineUsers));
            console.log('Online users after logging out:', Object.keys(onlineUsers));

           const rooms = Object.keys(socket.rooms);
           rooms.forEach(room => {
            socket.leave(room);
              console.log(`Socket ${socket.id} left the room ${room}`)
           })
    });

    
});

module.exports = { server, io };
