const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({
      userId,
      socketId,
    });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

let users = [];

export const setupSocketIO = (io) => {
  io.on("connection", (socket) => {
    //Add new user
    socket.on("add-user", (userId) => {
      addUser(userId, socket.id);
      io.emit("get-users", users);
    });

    socket.on("send-message", (messageData, receiverId) => {
      const receiver = getUser(receiverId);
      if (receiver?.socketId) {
        io.to(receiver.socketId).emit("receive-message", messageData);
      }
    });

    //Disconnecting the user
    socket.on("disconnect", () => {
      removeUser(socket.id);
      io.emit("get-users", users);
    });
  });
};
