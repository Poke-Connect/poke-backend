import MyConnection from "../models/myConnection.js";
import mongoose from "mongoose";

export const createNewConnection = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Invalid User" });
  }

  const connection = req.body;
  const newConnection = new MyConnection(connection);
  try {
    await newConnection.save();
    res.status(201).json(newConnection._id);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getMyConnections = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No user found" });
  }

  try {
    const myConnections = await MyConnection.findById(id);
    res.status(200).json(myConnections);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getConnection = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No user found" });
  }

  try {
    const myConnections = await MyConnection.findById(id);
    res.status(200).json(myConnections);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
