const setUpSocket = (server) => {
    const socketIo = require('socket.io');
    const io = socketIo(server, {
        cors: {
            origin: "http://localhost:5173", // Update this to your client URL
            methods: ["GET", "POST"]
        }
    }); // Initialize socket.io with the server

    // Handle socket connections
io.on('connection', (socket) => {
    console.log('A user connected');
  
    // Listen for events
    socket.on('chat message', (msg) => {
      console.log('Message received: ' + msg);
      io.emit('chat message', msg); // Broadcast message to all connected clients
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
}

module.exports= setUpSocket;