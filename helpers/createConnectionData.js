export const createConnectionData = (userConnections, userId) => {
  if (!userId || !userConnections) {
    return [];
  }

  const newUserConnections = [];
  for (let connection of userConnections) {
    const otherMember = connection.members.filter(
      (member) => member._id !== userId
    );
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
