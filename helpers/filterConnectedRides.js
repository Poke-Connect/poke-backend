import RideConnection from "../models/RideConnection.js";
import Ride from "../models/Ride.js";
import { createRideFilterQuery } from "./queryHelpers.js";

const getConnectedRidesIds = (rideConnections) => {
  const rideIds = [];
  if (!rideConnections) {
    return rideIds;
  }
  const { connectedConnections } = rideConnections;
  console.log("connected Connections", connectedConnections);
  connectedConnections.map((connection) =>
    rideIds.push(connection.ride.rideId.toString())
  );

  return rideIds;
};

export const filterConnectedRides = async (queryParams) => {
  const { ride } = queryParams;
  const filterQuery = createRideFilterQuery(queryParams);

  const otherRides = await Ride.find(filterQuery).populate("user");
  const rideConnections = await RideConnection.findOne({ ride: ride });

  const connectedRides = getConnectedRidesIds(rideConnections);

  const filteredRides = otherRides.filter(
    (ride) => !connectedRides.includes(ride._id.toString())
  );

  return filteredRides;
};
