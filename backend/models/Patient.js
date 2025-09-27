import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    species: {
      type: String,
      required: true,
      enum: ["dog", "cat", "bird", "reptile", "other"],
    },
    breed: {
      type: String,
    },
    age: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    medicalHistory: [
      {
        date: Date,
        diagnosis: String,
        treatment: String,
        vet: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    vaccinations: [
      {
        name: String,
        date: Date,
        nextDue: Date,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Patient", patientSchema);
