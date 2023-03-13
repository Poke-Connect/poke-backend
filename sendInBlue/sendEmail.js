import apiInstance from "./index.js";
import User from "../models/User.js";
import mongoose from "mongoose";

export const sendConnectionEmail = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return console.log("Invalid Id");
  }
  const user = await User.findById(id);
  if (!user) {
    console.log("No user found");
    return;
  }
  const { email } = user;
  const emailData = {
    to: [{ email }],
    templateId: 1,
  };
  try {
    await apiInstance.sendTransacEmail(emailData);
    return;
  } catch (error) {
    console.error("Failed to send email:", error);
    return;
  }
};
