import mongoose from "mongoose";

const myConnectionSchema = mongoose.Schema({
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  lastMessage: {
    messageId: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
    text: String,
    createdAt: Date,
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

const MyConnection = mongoose.model("MyConnection", myConnectionSchema);

export default MyConnection;
