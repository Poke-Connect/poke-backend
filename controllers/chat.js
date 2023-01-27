import Chat from "../models/chat.js";

export const getChats = async (_req, res) => {
  try {
    const rides = await Chat.find();
    res.status(200).json(rides);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getChat = async (req, res) => {
  const { id } = req.params;
  try {
    const ride = await Chat.findById(id);
    res.status(200).json(ride);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createChat = async (req, res) => {
  const ride = req.body;
  const newRide = new Chat(ride);
  try {
    await newRide.save();
    res.status(201).json(newRide);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateChat = async (req, res) => {
  const { id } = req.params;
  const ride = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No ride found" });
  }

  try {
    const updatedRide = await Chat.findByIdAndUpdate(id, ride, { new: true });
    res.json(updatedRide);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
