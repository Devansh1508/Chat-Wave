const setUpSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Join a group chat room
    socket.on('joinGroup', (groupId) => {
      socket.join(groupId);
      console.log(`User ${socket.id} joined group ${groupId}`);
    });

    // Handle group chat messages
    socket.on('groupMessage', ({ groupId, message }) => {
      console.log(`Group ${groupId} message: ${message}`);
      io.to(groupId).emit('groupMessage', message); // Broadcast to the group
    });

    // Join a private chat room
    socket.on('joinPrivate', (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined private room ${roomId}`);
    });

    // Handle private chat messages
    socket.on('privateMessage', ({ roomId, message }) => {
      console.log(`Private room ${roomId} message: ${message}`);
      io.to(roomId).emit('privateMessage', message); // Broadcast to the private room
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

export default setUpSocket;