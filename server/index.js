import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoute from './routes/user.js';
import messagesRoute from './routes/message.js';
import groupRoute from './routes/group.js'
import chatRoute from './routes/chat.js';
import connectDB from './config/database.js';
import { Server } from 'socket.io';
import setUpSocket from './sockets/socket.js'; // Import the socket setup function

dotenv.config();
connectDB();

const app = express();
// built on top of http
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Update this to your client URL
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoute);
app.use('/api/messages', messagesRoute);
app.use('/api/group',groupRoute);
app.use('/api/chat',chatRoute);

// Socket.IO setup
setUpSocket(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});