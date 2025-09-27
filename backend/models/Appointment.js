import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    location: { type: String, required: true },
    preventiveCare: { type: String },
    consultation: { type: String },
    ownerName: { type: String, required: true },
    email: { type: String, required: true },
    number: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/   // ✅ only 10-digit numbers
    },
    petName: { type: String, required: true },
    age: { type: String },
    gender: { type: String },
    breed: { type: String },
    address: { type: String },
    date: { type: Date, required: true },   // ✅ appointment date
    time: { type: String, required: true }, // ✅ appointment time (HH:mm or "10:30 AM")


    // ✅ New field for User(0) or Admin(1) appointment
    appointmentType: {
      type: Number,
      enum: [0, 1], // 0 = User, 1 = Admin
      default: 0,   // By default, it's a User appointment
    },

    // ✅ Status field
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);
