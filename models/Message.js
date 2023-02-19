import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: new Date(),
  },
  text: { type: String },
  senderId: { type: String },
  conversationId: { type: String, ref: "Chat" },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
