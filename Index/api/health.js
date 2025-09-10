import express from "express";
import nodemailer from "nodemailer";

const app = express();

// Health check route
app.get("/api/health", async (req, res) => {
  try {
    // Try to connect to SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE === "true", // converts string to boolean
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify SMTP connection
    await transporter.verify();

    res.json({
      ok: true,
      backend: "running",
      smtp: "connected ✅",
      timestamp: new Date(),
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      backend: "running",
      smtp: `connection failed ❌: ${err.message}`,
      timestamp: new Date(),
    });
  }
});

export default app;
