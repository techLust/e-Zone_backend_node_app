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

  io.on('connection', (socket) => {
    console.log('a user connected');

    //Sending message
    socket.on('message', message => {
        console.log(message);
        io.emit('message', `${message}`)
    });

    //Disconnect user
    socket.on('disconnect', () => {
        console.log('User disconnected');
    })
  });


// CREATE SERVER
httpServer.listen(process.env.PORT, () =>
    console.log(`
App Stage: ${process.env.ENV}
Server running on port: ${process.env.PORT}
`));