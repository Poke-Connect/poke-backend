import RideConnection from "../models/rideConnection.js";

export const getRideConnections = async (req, res) => {
  const { rideId } = req.params;
  try {
    const rides = await RideConnection.find();
    res.status(200).json(rides);
  } catch (error) {
    res.status(404).json({ message: error.message });
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

export const createRideConnection = async (req, res) => {
  const connection = req.body;
  const newRideConnection = new RideConnection(connection);
  try {
    await newRideConnection.save();
    res.status(201).json(newRideConnection);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
