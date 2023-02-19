import RideConnection from "../models/RideConnection.js";
import { createRideConnectionObj } from "../helpers/createRideConnection.js";

export const getRideConnections = async (req, res) => {
  const { rideId } = req.params;
  try {
    const rideConnections = await RideConnection.findOne({
      ride: rideId,
    });
    res.status(200).json(rideConnections);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createRideConnection = async (req, res) => {
  const connectionData = req.body;
  const { rideId } = req.params;

  try {
    const rideConnection = await RideConnection.findOne({ ride: rideId });
    if (!rideConnection) {
      const rideConnectionObj = createRideConnectionObj(rideId, connectionData);
      const newRideConnection = new RideConnection(rideConnectionObj);
      await newRideConnection.save();
      res.status(201).json(newRideConnection);
    } else {
      const updatedConnections = await RideConnection.findOneAndUpdate(
        { ride: rideId },
        {
          $push: {
            connectedConnections: connectionData,
          },
        }
      );
      res.status(201).json(updatedConnections);
    }
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getRideConnection = async (req, res) => {
  const { id } = req.params;
  try {
    const ride = await RideConnection.findById(id);
    res.status(200).json(ride);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
