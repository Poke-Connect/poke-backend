import { socketConstants } from "./helpers/socketConstants.js";
import { updateNewConnections } from "./helpers/updateNewConnections.js";
import { sendConnectionEmail } from "./sendInBlue/sendEmail.js";

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
  io.on(socketConstants.CONNECTION, (socket) => {
    //Add new user
    socket.on(socketConstants.ADD_USER, (userId) => {
      addUser(userId, socket.id);
      io.emit(socketConstants.GET_USERS, users);
    });

    //Handle messages
    socket.on(socketConstants.SEND_MESSAGE, (messageData, receiverId) => {
      const receiver = getUser(receiverId);
      if (receiver?.socketId) {
        io.to(receiver.socketId).emit(
          socketConstants.RECEIVE_MESSAGE,
          messageData
        );
      } else {
        updateNewConnections(receiverId, messageData.connectionId);
      }
    });

    //Handle connections
    socket.on(socketConstants.ADD_CONNECTION, (connectionData, receiverId) => {
      const receiver = getUser(receiverId);
      if (receiver?.socketId) {
        io.to(receiver.socketId).emit(
          socketConstants.CONNECTION_ADDED,
          connectionData
        );
      } else {
        updateNewConnections(receiverId, connectionData.connectionId);
        sendConnectionEmail(receiverId);
      }
    });

    //Handle ride
    socket.on(socketConstants.CREATE_RIDE, (rideData) => {
      socket.broadcast.emit(socketConstants.GET_RIDE, rideData);
    });

    //Handle ride discoverability toggle
    socket.on(socketConstants.RIDE_DISCOVERABILITY_TOGGLE, (rideData) => {
      socket.broadcast.emit(socketConstants.GET_TOGGLED_RIDE, rideData);
    });

    //Disconnecting the user
    socket.on(socketConstants.DISCONNECT, () => {
      removeUser(socket.id);
      io.emit(socketConstants.GET_USERS, users);
    });
  });
};
