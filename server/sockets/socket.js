<<<<<<< HEAD
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

=======
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
  
>>>>>>> f2e7c2f48ad768608e475c737da391f4838e7488
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
}

<<<<<<< HEAD
export default setUpSocket;
=======
module.exports= setUpSocket;
>>>>>>> f2e7c2f48ad768608e475c737da391f4838e7488
