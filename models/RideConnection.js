import mongoose from "mongoose";

const matchInfoSchema = mongoose.Schema({
  extraDist: String,
  extraTime: String,
});

const rideInfoSchema = mongoose.Schema({
  rideId: { type: mongoose.Schema.Types.ObjectId, ref: "Ride", required: true },
  location: String,
  timeStampRide: String,
});

const userInfoSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  displayName: String,
  email: String,
  photoURL: String,
});

const connectionsSchema = mongoose.Schema({
  user: userInfoSchema,
  ride: rideInfoSchema,
  matchInfo: matchInfoSchema,
  connectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Connection",
    required: true,
  },
});

const rideConnectionSchema = mongoose.Schema({
  ride: { type: mongoose.Schema.Types.ObjectId, ref: "Ride", required: true },
  connectedConnections: [connectionsSchema],
});

const RideConnection = mongoose.model("RideConnection", rideConnectionSchema);

export default RideConnection;

// rideId --> Connected Connections --> [user data | ride data | match data]
