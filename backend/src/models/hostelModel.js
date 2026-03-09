import mongoose from "mongoose";

const hostelSchema = new mongoose.Schema(
  {
    hostelName: {
      type: String,
      required: true,
    },
    hostelType: {
      type: String, 
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    totalRooms: {
      type: Number,
      required: true,
    },
    availableRooms: {
      type: Number,
      required: true,
    },
    roomType: {
      type: String, 
      required: true,
    },
    rentPerMonth: {
      type: Number,
      required: true,
    },
    wardenName: {
      type: String,
    },
    contactNumber: {
      type: String,
    },
    status: {
      type: String,
      default: "Available",
    },
  },
  { timestamps: true }
);

const HostelExport = mongoose.model("Hostel", hostelSchema);
export default HostelExport;
