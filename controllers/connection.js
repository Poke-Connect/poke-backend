import Connection from "../models/Connection.js";
import mongoose from "mongoose";

const checkConnectionExists = async (user1Id, user2Id) => {
  const connection = await Connection.findOne({
    members: { $all: [user1Id, user2Id] },
  });
  return connection;
};

const createConnection = async (user1Id, user2Id) => {
  const newConnection = new Connection({
    members: [user1Id, user2Id],
  });
  const connection = await newConnection.save();
  return connection;
};

export const createOrGetConnection = async (req, res) => {
  const [user1Id, user2Id] = req.body.members;
  try {
    const connection = await checkConnectionExists(user1Id, user2Id);
    if (connection) {
      res.status(200).json({ connectionId: connection._id });
    } else {
      const newConnection = await createConnection(user1Id, user2Id);
      res.status(201).json({ connectionId: newConnection._id });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserConnections = async (req, res) => {
  const { userId } = req.query;

  try {
    const userConnections = await Connection.find({
      members: { $in: [userId] },
    })
      .populate({
        path: "members",
        select: "displayName email _id photoURL",
      })
      .sort("-updatedAt")
      .exec();
    res.status(200).json(userConnections);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateConnection = async (req, res) => {
  const { connectionId } = req.params;
  const { lastMessage, updatedAt } = req.body;

  if (!mongoose.Types.ObjectId.isValid(connectionId)) {
    return res.status(404).json({ message: "Not a valid connection" });
  }

  try {
    const connectionExists = await Connection.findById(connectionId);

    if (!connectionExists) {
      return res.status(404).json({ message: "No connection found" });
    }

    const updatedConnection = await Connection.findByIdAndUpdate(
      connectionId,
      { lastMessage, updatedAt },
      { new: true }
    );

    res.json(updatedConnection);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getConnection = async (req, res) => {
  const { connectionId } = req.params;
  try {
    const connection = await Connection.findById(connectionId);
    res.status(200).json(connection);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
