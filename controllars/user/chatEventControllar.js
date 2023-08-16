
module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected', socket.id);
    socket.on('message', async (message) => {
      console.log("MESSAGE:", message);
      io.emit('getMessage', message)
    });
  });
}
