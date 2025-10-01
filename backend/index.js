import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Add `.js` at the end of local imports
import authRoute from "./routes/auth.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import patientRoutes from "./routes/patient.routes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Middleware
app.use("/api/auth", authRoute);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/patients", patientRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
