import mongoose from "mongoose";

const feedbackSchema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: new Date(),
  },
  email: String,
  name: String,
  suggestion: String,
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;
