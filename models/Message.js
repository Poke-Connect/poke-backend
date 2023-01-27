import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    conversationId: { type: String, ref: "Chat" },
    senderId: { type: String },
    text: { type: String },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
