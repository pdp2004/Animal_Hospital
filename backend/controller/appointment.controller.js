import nodemailer from "nodemailer";
import Appointment from "../models/Appointment.js"; // make sure this path is correct

export const book = async (req, res) => {
  try {
    // Save appointment to DB
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();

    // Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,     // ✅ use EMAIL_USER
        pass: process.env.EMAIL_PASS,     // ✅ include EMAIL_PASS
      },
    });

    // Debugging check
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("❌ Missing email credentials. Check your .env file.");
    }

    // Admin notification email
    const adminMailOptions = {
      from: `"Pet Clinic" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,        // admin receives email
      subject: "🐾 New Appointment Booked",
      html: `
        <h2>New Appointment Details</h2>
        <p><strong>Owner:</strong> ${req.body.ownerName}</p>
        <p><strong>Email:</strong> ${req.body.email || "Not provided"}</p>
        <p><strong>Mobile Number:</strong> ${req.body.number || "Not provided"}</p>
        <p><strong>Pet:</strong> ${req.body.petName}</p>
        <p><strong>Location:</strong> ${req.body.location}</p>
        <p><strong>Service:</strong> ${req.body.preventiveCare} / ${req.body.consultation}</p>
        <p><strong>Date & Time:</strong> ${req.body.date} at ${req.body.time}</p>
        <p><strong>Breed:</strong> ${req.body.breed}</p>
        <p><strong>Gender:</strong> ${req.body.gender}</p>
        <p><strong>Age:</strong> ${req.body.age}</p>
        <p><strong>Address:</strong> ${req.body.address}</p>
      `,
    };

    // User confirmation email
    // const userMailOptions = {
    //   from: `"Pet Clinic" <${process.env.EMAIL_USER}>`,
    //   to: req.body.email,
    //   subject: "✅ Appointment Confirmation",
    //   html: `
    //     <h2>Appointment Confirmed</h2>
    //     <p>Hello <strong>${req.body.ownerName}</strong>,</p>
    //     <p>Your appointment has been booked successfully.</p>
    //     <p><strong>Date & Time:</strong> ${req.body.date} at ${req.body.time}</p>
    //     <p><strong>Location:</strong> ${req.body.location}</p>
    //     <p>We look forward to seeing you and ${req.body.petName} 🐶🐱</p>
    //   `,
    // };

    // Send emails
    try {
      await transporter.sendMail(adminMailOptions);
      console.log("📧 Admin notified");

      // if (req.body.email) {
      //   await transporter.sendMail(userMailOptions);
      //   console.log("📧 Confirmation sent to user");
      // }
    } catch (mailErr) {
      console.error("❌ Email sending failed:", mailErr.message);
    }

    res.status(201).json({
      message: "Appointment booked successfully! Confirmation email sent.",
    });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ message: "Error booking appointment" });
  }
};


// 📌 API Route - Get All Appointments
export const appointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments" });
  }
};

export const todayAppointment = async (req, res) => {
  try {
    // Get start and end of today's date range
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    // Fetch appointments within today's date range
    const todaysAppointments = await Appointment.find({
      date: { $gte: startOfToday, $lte: endOfToday },
    }).sort({ time: 1 });

    return res.status(200).json({
      success: true,
      count: todaysAppointments.length,
      data: todaysAppointments,
    });
  } catch (err) {
    console.error("❌ Error fetching today’s appointments:", err);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch today’s appointments",
    });
  }
};
export const getUpcomingAppointments = async (req, res) => {
  try {
    const now = new Date();

    const upcomingAppointments = await Appointment.aggregate([
      {
        // Convert stored `date` + `time` into one comparable datetime
        $addFields: {
          aptDateTime: {
            $dateFromString: {
              dateString: {
                $concat: [
                  {
                    $dateToString: { date: "$date", format: "%Y-%m-%d" },
                  },
                  "T",
                  "$time",
                ],
              },
              onError: null,
              onNull: null,
            },
          },
        },
      },
      {
        // Only future appointments
        $match: {
          aptDateTime: { $gt: now },
        },
      },
      {
        $sort: { aptDateTime: 1 },
      },
      {
        $limit: 3,
      },
    ]);

    return res.status(200).json({
      success: true, 
      count: upcomingAppointments.length,
      data: upcomingAppointments,
    });
  } catch (error) {
    console.error("❌ Error fetching upcoming appointments:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch upcoming appointments.",
    });
  }
};

// export const updateAppointment = async (req, res) => {
//   try {
//     const updatedAppointment = await Appointment.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     ).populate("user", "name email role blocked");

//     res.json(updatedAppointment);
//     // res.json("updatedAppointment");
//   } catch (err) {
//     res.status(400).json({ error: "Failed to update appointment" });
//   }
// };

export const updateAppointment = async (req, res) => {
  try {

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send status change email to user
    if (updatedAppointment.email) {
      const mailOptions = {
        from: `"Pet Clinic" <${process.env.EMAIL_USER}>`,
        to: updatedAppointment.email,
        subject: `📌 Appointment Updated`,
        html: `
          <p>Hello <strong>${updatedAppointment.ownerName}</strong>,</p>
          <p>Your appointment for <strong>${updatedAppointment.petName}</strong> has been Updated.</p>
          <p><strong>Date & Time:</strong> ${updatedAppointment.date} at ${updatedAppointment.time}</p>
          <p><strong>Location:</strong> ${updatedAppointment.location}</p>
          <p>Thank you for trusting us with your pet's care! 🐶🐱</p>
        `,
      };

      try {
        await transporter.sendMail(mailOptions);
      } catch (mailErr) {
        console.error("❌ Email sending failed:", mailErr.message);
      }
    }

    res.json({
      message: "Appointment status updated to successfully",
      appointment: updatedAppointment,
    });
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ message: "Server error while updating appointment" });
  }
};

// ✅ Delete appointment
export const deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: "Appointment deleted" });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete appointment" });
  }
};



export const confirm = async (req, res) => {
  try {
    // ✅ Update appointment status
    const appt = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: "Confirmed" },
      { new: true }
    );

    if (!appt) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // ✅ Find user linked to appointment (assuming Appointment has userId field)
    let userEmail = appt.email; // fallback if email stored in appointment
    if (appt.userId) {
      const user = await User.findById(appt.userId);
      if (user) {
        userEmail = user.email;
      }
    }

    // ✅ Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("❌ Missing email credentials. Check your .env file.");
    }

    // // ✅ Admin notification email
    // const adminMailOptions = {
    //   from: `"Pet Clinic" <${process.env.ADMIN_EMAIL}>`,
    //   to: process.env.EMAIL_USER,
    //   subject: "📢 Appointment Confirmed",
    //   html: `
    //     <h2>Appointment Confirmed</h2>
    //     <p><strong>Owner:</strong> ${appt.ownerName}</p>
    //     <p><strong>Email:</strong> ${userEmail || "Not provided"}</p>
    //     <p><strong>Pet:</strong> ${appt.petName}</p>
    //     <p><strong>Location:</strong> ${appt.location}</p>
    //     <p><strong>Date & Time:</strong> ${new Date(appt.date).toLocaleDateString()} at ${appt.time}</p>
    //     <p><strong>Status:</strong> Confirmed ✅</p>
    //   `,
    // };

    // ✅ User confirmation email
    const userMailOptions = {
      from: `"Pet Clinic" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: "✅ Appointment Confirmed",
      html: `
        <h2>Appointment Confirmed</h2>
        <p>Hello <strong>${appt.ownerName}</strong>,</p>
        <p>Your appointment for <strong>${appt.petName}</strong> has been confirmed.</p>
        <p><strong>Date & Time:</strong> ${new Date(appt.date).toLocaleDateString()} at ${appt.time}</p>
        <p><strong>Location:</strong> ${appt.location}</p>
        <p>We look forward to seeing you! 🐶🐱</p>
      `,
    };

    // ✅ Send emails
    try {
      // await transporter.sendMail(adminMailOptions);
      // console.log("📧 Admin notified about confirmation");

      if (userEmail) {
        await transporter.sendMail(userMailOptions);
        console.log("📧 Confirmation email sent to user:", userEmail);
      }
    } catch (mailErr) {
      console.error("❌ Email sending failed:", mailErr.message);
    }

    res.json({
      message: "Appointment confirmed successfully! Emails sent.",
      appointment: appt,
    });
  } catch (error) {
    console.error("Error confirming appointment:", error);
    res.status(500).json({ message: "Error confirming appointment" });
  }
};


// ✅ Cancel appointment
export const cancel = async (req, res) => {
  try {
    // ✅ Update appointment status
    const appt = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: "Cancelled" },
      { new: true }
    );

    if (!appt) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // ✅ Find user linked to appointment (fallback to appointment email)
    let userEmail = appt.email;
    if (appt.userId) {
      const user = await User.findById(appt.userId);
      if (user) {
        userEmail = user.email;
      }
    }

    // ✅ Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("❌ Missing email credentials. Check your .env file.");
    }

    // ✅ Admin notification email
    // const adminMailOptions = {
    //   from: `"Pet Clinic" <${process.env.EMAIL_USER}>`,
    //   to: process.env.EMAIL_USER,
    //   subject: "❌ Appointment Cancelled (Admin Copy)",
    //   html: `
    //     <h2>Appointment Cancelled</h2>
    //     <p><strong>Owner:</strong> ${appt.ownerName}</p>
    //     <p><strong>Pet:</strong> ${appt.petName}</p>
    //     <p><strong>Date & Time:</strong> ${new Date(appt.date).toLocaleDateString()} at ${appt.time}</p>
    //     <p><strong>Location:</strong> ${appt.location}</p>
    //   `,
    // };

    // ✅ User cancellation email
    const userMailOptions = {
      from: `"Pet Clinic" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: "❌ Appointment Cancelled",
      html: `
        <h2>Appointment Cancelled</h2>
        <p>Hello <strong>${appt.ownerName}</strong>,</p>
        <p>We regret to inform you that your appointment for <strong>${appt.petName}</strong> has been cancelled.</p>
        <p><strong>Date & Time:</strong> ${new Date(appt.date).toLocaleDateString()} at ${appt.time}</p>
        <p><strong>Location:</strong> ${appt.location}</p>
        <p>If you wish, you can book a new appointment at your convenience.</p>
      `,
    };

    // ✅ Send emails
    try {
      // await transporter.sendMail(adminMailOptions);
      // console.log("📧 Admin notified about cancellation");

      if (userEmail) {
        await transporter.sendMail(userMailOptions);
        console.log("📧 Cancellation email sent to user:", userEmail);
      }
    } catch (mailErr) {
      console.error("❌ Email sending failed:", mailErr.message);
    }

    res.json({
      message: "Appointment cancelled successfully! Emails sent.",
      appointment: appt,
    });
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    res.status(500).json({ message: "Error cancelling appointment" });
  }
};


export const completed = async (req, res) => {
  try {
    // ✅ Update appointment status
    const appt = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: "Completed" },
      { new: true }
    );

    if (!appt) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // ✅ Find user linked to appointment (fallback to appointment email)
    let userEmail = appt.email;
    if (appt.userId) {
      const user = await User.findById(appt.userId);
      if (user) {
        userEmail = user.email;
      }
    }

    // ✅ Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("❌ Missing email credentials. Check your .env file.");
    }

    // ✅ Admin notification email
    // const adminMailOptions = {
    //   from: `"Pet Clinic" <${process.env.EMAIL_USER}>`,
    //   to: process.env.EMAIL_USER,
    //   subject: "✅ Appointment Completed (Admin Copy)",
    //   html: `
    //     <h2>Appointment Completed</h2>
    //     <p><strong>Owner:</strong> ${appt.ownerName}</p>
    //     <p><strong>Pet:</strong> ${appt.petName}</p>
    //     <p><strong>Date & Time:</strong> ${new Date(appt.date).toLocaleDateString()} at ${appt.time}</p>
    //     <p><strong>Location:</strong> ${appt.location}</p>
    //   `,
    // };

    // ✅ User completion email
    const userMailOptions = {
      from: `"Pet Clinic" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: "✅ Appointment Completed",
      html: `
        <h2>Appointment Completed</h2>
        <p>Hello <strong>${appt.ownerName}</strong>,</p>
        <p>Your appointment for <strong>${appt.petName}</strong> has been successfully completed.</p>
        <p><strong>Date & Time:</strong> ${new Date(appt.date).toLocaleDateString()} at ${appt.time}</p>
        <p><strong>Location:</strong> ${appt.location}</p>
        <p>Thank you for trusting us with your pet's care! 🐶🐱</p>
      `,
    };

    // ✅ Send emails
    try {
      // await transporter.sendMail(adminMailOptions);
      // console.log("📧 Admin notified about completion");

      if (userEmail) {
        await transporter.sendMail(userMailOptions);
        console.log("📧 Completion email sent to user:", userEmail);
      }
    } catch (mailErr) {
      console.error("❌ Email sending failed:", mailErr.message);
    }

    res.json({
      message: "Appointment marked as completed! Emails sent.",
      appointment: appt,
    });
  } catch (error) {
    console.error("Error completing appointment:", error);
    res.status(500).json({ message: "Error completing appointment" });
  }
};


// ✅ (Optional) Delete appointment
// app.delete("/api/appointments/:id", async (req, res) => {
//   try {
//     const appt = await Appointment.findByIdAndDelete(req.params.id);
//     if (!appt) return res.status(404).json({ message: "Appointment not found" });
//     res.json({ message: "Appointment deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting appointment:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });