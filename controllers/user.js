import User from "../models/User.js";
import mongoose from "mongoose";

export const getUsers = async (_req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const user = req.body;
  const newUser = new User(user);
  try {
    await newUser.save();
    res.status(201).json(newUser._id);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = req.body;

  if (user.email) {
    return res.status(404).json({ message: "Cannot update email address" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Not a valid user" });
  }

  try {
    const userExists = await User.findById(id);
    if (!userExists) {
      return res.status(404).json({ message: "No user found" });
    }

    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Not a valid user" });
  }

  try {
    const userExists = await User.findById(id);
    if (!userExists) {
      return res.status(404).json({ message: "No user found" });
    }

    await User.findByIdAndRemove(id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
