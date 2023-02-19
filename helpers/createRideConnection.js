export const createRideConnectionObj = (id, connectionData) => {
  const rideConnectionObj = {
    ride: id,
    connectedConnections: [connectionData],
  };
  return rideConnectionObj;
};
