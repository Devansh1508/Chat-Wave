import setUpSocket from './sockets/socket.js';
import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoute from './routes/user.js';
import connectDB from './config/database.js';

const app = express();

// dotenv 
dotenv.config();
const PORT = process.env.PORT || 5000;

// cors middleware
app.use(cors());

// sockets 
const server = http.createServer(app);
setUpSocket(server);

// connect to database
connectDB();

app.get('/user', userRoute);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
