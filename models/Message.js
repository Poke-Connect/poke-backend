import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: new Date(),
  },
  text: { type: String },
  senderId: { type: String },
  connectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Connection",
    required: true,
  },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
