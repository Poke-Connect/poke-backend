import mongoose from "mongoose";

const userRideSchema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: new Date(),
  },
  userId: String,
  rideId: String,
});

const UserRide = mongoose.model("UserRide", userRideSchema);

export default UserRide;
