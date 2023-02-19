import mongoose from "mongoose";

const connectionSchema = mongoose.Schema({
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  lastMessage: {
    senderId: { type: String, default: null },
    text: { type: String, default: "" },
    timestamp: { type: Date, default: Date.now },
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

const Connection = mongoose.model("Connection", connectionSchema);

export default Connection;
