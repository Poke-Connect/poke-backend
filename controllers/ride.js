import Ride from "../models/ride.js";
import mongoose from "mongoose";

export const getRides = async (_req, res) => {
  try {
    const rides = await Ride.find();
    res.status(200).json(rides);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getRide = async (req, res) => {
  const { id } = req.params;
  try {
    const ride = await Ride.findById(id);
    res.status(200).json(ride);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createRide = async (req, res) => {
  const ride = req.body;
  const newRide = new Ride(ride);
  try {
    await newRide.save();
    res.status(201).json(newRide._id);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateRide = async (req, res) => {
  const { id } = req.params;
  const ride = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Not a valid ride" });
  }

  try {
    const rideExists = await Ride.findById(id);
    if (!rideExists) {
      return res.status(404).json({ message: "No ride found" });
    }

    const updatedRide = await Ride.findByIdAndUpdate(id, ride, { new: true });
    res.json(updatedRide);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteRide = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Not a valid ride" });
  }

  try {
    const rideExists = await Ride.findById(id);
    if (!rideExists) {
      return res.status(404).json({ message: "No ride found" });
    }

    await Ride.findByIdAndRemove(id);
    res.status(200).json({ message: "Ride deleted successfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
