import mongoose from "mongoose";

const rideSchema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: new Date(),
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String, required: true },
  discoverability: { type: Boolean, default: true },
  location: { type: String, required: true },
  rideType: { type: String, required: false },
  time: { type: String, required: false },
  timeStampRide: { type: Number, required: false },
  distance: { type: Number, required: false },
  from: { type: String, required: true },
});

const Ride = mongoose.model("Ride", rideSchema);

export default Ride;
