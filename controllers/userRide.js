import Ride from "../models/Ride.js";
import mongoose from "mongoose";

export const getUserRides = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Not a valid user" });
  }

  try {
    const userRides = await Ride.find({ user: id });
    res.status(200).json(userRides);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
