// import express from "express";
// import nodemailer from "nodemailer";

// const app = express();

// // Health check route
// app.get("/api/health", async (req, res) => {
//   try {
//     // Try to connect to SMTP
//     const transporter = nodemailer.createTransport({
//       host: process.env.EMAIL_HOST,
//       port: process.env.EMAIL_PORT,
//       secure: process.env.EMAIL_SECURE === "true", // converts string to boolean
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     // Verify SMTP connection
//     await transporter.verify();

//     res.json({
//       ok: true,
//       backend: "running",
//       smtp: "connected ✅",
//       timestamp: new Date(),
//     });
//   } catch (err) {
//     res.status(500).json({
//       ok: false,
//       backend: "running",
//       smtp: `connection failed ❌: ${err.message}`,
//       timestamp: new Date(),
//     });
//   }
// });

// export default app;


import nodemailer from "nodemailer";

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://www.thepaintersdiary.com',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  'Access-Control-Allow-Credentials': 'true'
};

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export default async function handler(req, res) {
  // Set CORS headers
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const transporter = createTransporter();
    const smtpStatus = await transporter.verify().then(() => true).catch(() => false);
    
    res.status(200).json({ 
      ok: true, 
      services: {
        email: smtpStatus ? "connected" : "disconnected"
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(200).json({ 
      ok: true, 
      services: {
        email: "disconnected"
      },
      timestamp: new Date().toISOString()
    });
  }
}