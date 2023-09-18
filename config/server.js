const app = require('../app');
require('./database');
require('dotenv').config();
const http = require('http')
const {Server} = require("socket.io");

const httpServer = http.createServer(app);
const PORT = process.env.PORT || 8080

const io = new Server(httpServer, {
  cors: { origin: '*' }
});
const exportSocket = require('../controllars/user/chatEventControllar')(io)


// CREATE SERVER
httpServer.listen(PORT, HOST, () =>
  console.log(`
App Stage: ${process.env.ENV}
Server running on ${HOST}:${PORT}
`));