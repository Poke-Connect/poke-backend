import mongoose from "mongoose";

const matchInfoSchema = mongoose.Schema({
  extraDist: String,
  extraTime: String,
});

const rideInfoSchema = mongoose.Schema({
  location: String,
  rideId: String,
  time: String,
});

const userInfoSchema = mongoose.Schema({
  uid: String,
  displayName: String,
  email: String,
  photoURL: String,
});

const rideConnectionSchema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: new Date(),
  },
  matchId: String,
  date: String,
  userInfo: userInfoSchema,
  rideInfo: rideInfoSchema,
  matchInfo: matchInfoSchema,
});

const RideConnection = mongoose.model("RideConnection", rideConnectionSchema);

export default RideConnection;
