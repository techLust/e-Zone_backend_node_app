const io = require('../../config/server')

//ESTABLISHING SOCKET CONNECTION
io.on('connection', (socket) => {
    console.log('Client connected');
  
    //Sending message
    socket.on('message', message => {
      console.log(message);
      io.emit('message', `${message}`)
    });
  
    //Disconnect user
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });