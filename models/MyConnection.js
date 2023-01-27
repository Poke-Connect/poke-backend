import mongoose from "mongoose";

// const rideInfoSchema = moongose.Schema({
//   location: String,
//   rideId: String,
//   time: String,
// });

// const userInfoSchema = moongose.Schema({
//   uid: String,
//   displayName: String,
//   email: String,
//   photoURL: String,
// });

const matchInfoSchema = mongoose.Schema({
  extraDist: String,
  extraTime: String,
});

const lastMessageSchema = mongoose.Schema({
  text: { type: String, default: "" },
  timeStamp: {
    type: Date,
    default: new Date(),
  },
});

const myConnectionSchema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: new Date(),
  },
  date: String,
  userInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true,
  },
  rideInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ride",
    // required: true,
  },
  matchInfo: matchInfoSchema,
  lastMessage: lastMessageSchema,
});

const MyConnection = mongoose.model("MyConnection", myConnectionSchema);

export default MyConnection;
