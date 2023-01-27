import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: new Date(),
  },
  displayName: { type: String, required: true },
  email: { type: String, required: true },
  firstName: String,
  lastName: String,
  photoURL: String,
  gender: String,
  mobile: Number,
  linkedIn: String,
  occupation: String,
  company: String,
  about: String,
  googleId: String,
});

const User = mongoose.model("User", userSchema);

export default User;
