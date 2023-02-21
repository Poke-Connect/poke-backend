import Message from "../models/Message.js";

export const addMessage = async (req, res) => {
  const message = req.body;
  const newMessage = new Message(message);
  try {
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getConnectionMessages = async (req, res) => {
  const { connectionId } = req.params;
  try {
    const messages = await Message.find({
      connectionId: { $eq: connectionId },
    }).sort("-updatedAt");
    res.status(200).json(messages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
