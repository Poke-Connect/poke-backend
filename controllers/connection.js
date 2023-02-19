import Connection from "../models/Connection.js";

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
  const { user1Id, user2Id } = req.body.members;
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
    const userConnections = await Connection.find({ members: userId });
    res.status(200).json(userConnections);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateConnection = async (req, res) => {
  const { connectionId } = req.params;
  const { lastMessage } = req.body;
  try {
    const connection = await Connection.findByIdAndUpdate(
      connectionId,
      { lastMessage },
      { new: true }
    );
    if (!connection) {
      return res.status(404).json({ message: "Connection not found" });
    }
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
