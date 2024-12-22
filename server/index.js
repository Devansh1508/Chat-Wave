const setUpSocket = require('./sockets/socket');
const express = require('express');
const http = require('http');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 5000;

// cors middleware
const cors = require('cors');
app.use(cors());

// sockets 
const server = http.createServer(app);
setUpSocket(server);

app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index?.html');
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
