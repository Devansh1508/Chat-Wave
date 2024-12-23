import { Server } from 'socket.io';

const setUpSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // Update this to your client URL
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
      io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
}

export default setUpSocket;