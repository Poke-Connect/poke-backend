import MyConnection from "../models/MyConnection.js";
import mongoose from "mongoose";

const checkConnectionExists = async (user1Id, user2Id) => {
  const connection = await MyConnection.findOne({
    members: { $all: [user1Id, user2Id] },
  });
  return connection;
};

const createConnection = async (user1Id, user2Id) => {
  const newConnection = new MyConnection({
    members: [user1Id, user2Id],
  });
  const connection = await newConversation.save();
  return conversation;
};

async function createOrGetConnection(req, res) {
  const { user1Id, user2Id } = req.params;

  const connection = await checkConnectionExists(user1Id, user2Id);

  if (connection) {
    res.status(200).json({ connectionId: connection._id });
  } else {
    const newConversation = await createConversation(user1Id, user2Id);
    res.status(201).json({ conversationId: newConversation._id });
  }
}

// export const createNewConnection = async (req, res) => {
//   const { members } = req.body;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({ message: "Invalid User" });
//   }

//   const connection = req.body;
//   const newConnection = new MyConnection(connection);
//   try {
//     await newConnection.save();
//     res.status(201).json(newConnection._id);
//   } catch (error) {
//     res.status(409).json({ message: error.message });
//   }
// };

// export const getMyConnections = async (req, res) => {
//   const { id } = req.params;
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({ message: "No user found" });
//   }

//   try {
//     const myConnections = await MyConnection.findById(id);
//     res.status(200).json(myConnections);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

// export const getConnection = async (req, res) => {
//   const { id } = req.params;
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({ message: "No user found" });
//   }

//   try {
//     const myConnections = await MyConnection.findById(id);
//     res.status(200).json(myConnections);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };
