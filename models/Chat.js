import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  messageId: String,
  date: Date,
  senderId: String,
  text: String,
});

const chatSchema = mongoose.Schema({
  messages: [messageSchema],
  users: [Object],
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
