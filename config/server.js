const app = require('../app');
require('./database');
require('dotenv').config();
const http = require('http')
const {Server} = require("socket.io");

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: { origin: '*' }
});
const exportSocket = require('../controllars/user/chatEventControllar')(io)


// CREATE SERVER
httpServer.listen(process.env.PORT, () =>
  console.log(`
App Stage: ${process.env.ENV}
Server running on port: ${process.env.PORT}
`));