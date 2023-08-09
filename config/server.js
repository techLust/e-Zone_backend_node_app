const app = require('../app');
require('./database');
require('dotenv').config();
const path = require('path')
const http = require('http')
const socketConnection = require("socket.io");


const httpServer = http.createServer(app);
const io = socketConnection(httpServer, {
  cors: { origin: '*' }
});


// CREATE SERVER
httpServer.listen(process.env.PORT, () =>
  console.log(`
App Stage: ${process.env.ENV}
Server running on port: ${process.env.PORT}
`));

module.exports =  io