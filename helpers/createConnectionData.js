export const createConnectionData = (userConnections, userId) => {
  console.log("running createConnectionData", userId);
  if (!userId || !userConnections) {
    return [];
  }
  console.log("running userConnections", userConnections);

  const newUserConnections = [];
  for (let connection of userConnections) {
    console.log("connection", connection);
    const otherMember = connection.members.filter(
      (member) => member._id !== userId
    );
    console.log("otherMember", otherMember);

    const newConnection = {
      _id: connection._id,
      userInfo: otherMember,
      lastMessage: connection.lastMessage,
      updatedAt: connection.updatedAt,
    };
    newUserConnections.push(newConnection);
  }

  return newUserConnections;
};
