import Feedback from "../models/Feedback.js";

export const createFeedback = async (req, res) => {
  const feedback = req.body;
  const newFeedback = new Feedback(feedback);
  try {
    await newFeedback.save();
    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
