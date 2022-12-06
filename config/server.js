const app = require('../app');
require('./database');
require('dotenv').config();
const path = require('path')
// const server = require('http').createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);

const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});

//SETTING UP PEER SERVER
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(httpServer, {
  degub:true,
})
app.use('/peerjs', peerServer);

//ESTABLISHING SOCKET CONNECTION

  io.on('connection', (socket) => {
    console.log('Client connected');

    //Sending message
    socket.on('message', message => {
        console.log(message);
        io.emit('message', `${message}`)
    });

    //Join video room
    socket.on('join-room', (roomId, userId) => {
      socket.join(roomId);
      socket.broadcast.to(roomId).emit('user-connected', userId);
    });

    //Disconnect user
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
  });


// CREATE SERVER
httpServer.listen(process.env.PORT, () =>
    console.log(`
App Stage: ${process.env.ENV}
Server running on port: ${process.env.PORT}
`));