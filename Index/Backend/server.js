// import express from "express";
// import cors from "cors";
// import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// app.use(express.json());

// // CORS for your Vite dev server
// app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));

// // One SMTP transporter reused across requests
// const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST,
//   port: Number(process.env.EMAIL_PORT || 465),
//   secure: String(process.env.EMAIL_SECURE).toLowerCase() === "true", // true → SSL (465)
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // Optional: verify SMTP connection on boot (helpful in dev)
// transporter.verify().then(() => {
//   console.log("✅ SMTP connection verified");
// }).catch(err => {
//   console.error("❌ SMTP connection failed:", err);
// });

// // Health check
// app.get("/api/health", (_req, res) => res.json({ ok: true }));

// // The endpoint your hook calls
// app.post("/api/send-verification", async (req, res) => {
//   try {
//     const { to, code, username } = req.body || {};
//     if (!to || !code || String(code).length !== 6) {
//       return res.status(400).json({ ok: false, error: "Invalid payload" });
//     }

//     const fromName = process.env.APP_NAME || "Painters' Diary";
//     const from = `"${fromName}" <${process.env.EMAIL_USER}>`;

//     const subject = `${fromName}: Your verification code`;

//     const text = `Hi${username ? " " + username : ""},

// Your verification code is: ${code}

// This code expires in 10 minutes. If you didn't request this, you can ignore this email.

// — ${fromName}`;

//     const html = `
//       <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:520px;margin:auto;padding:24px;">
//         <div style="text-align:center;font-weight:800;font-size:18px;">${fromName}</div>
//         <p>Hi${username ? " <b>" + username + "</b>" : ""},</p>
//         <p>Your email verification code is:</p>
//         <div style="text-align:center;margin:20px 0;">
//           <div style="display:inline-block;font-size:32px;letter-spacing:6px;font-weight:800;border:2px solid #e5e7eb;border-radius:12px;padding:12px 18px;">
//             ${code}
//           </div>
//         </div>
//         <p>This code expires in <b>10 minutes</b>.</p>
//         <p style="color:#6b7280;font-size:12px;margin-top:24px;">If you didn’t request this, you can safely ignore this email.</p>
//         <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;" />
//         <p style="color:#9ca3af;font-size:11px;text-align:center;">© ${new Date().getFullYear()} ${fromName}</p>
//       </div>
//     `;

//     const info = await transporter.sendMail({
//       from,
//       to,
//       subject,
//       text,
//       html,
//       headers: {
//         "X-Entity-Ref-ID": `verify-${Date.now()}`, // helpful in logs
//       },
//       replyTo: `support@thepaintersdiary.com`, // optional
//     });

//     // Match your hook expectation:
//     return res.status(200).json({ ok: true, id: info.messageId });
//   } catch (err) {
//     console.error("send-verification error:", err);
//     return res.status(500).json({ ok: false, error: "Email provider failed" });
//   }
// });

// const PORT = Number(process.env.PORT || 3001);
// app.listen(PORT, () => {
//   console.log(`🚀 Backend running at http://localhost:${PORT}`);
// });




// import express from "express";
// import cors from "cors";
// import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// app.use(express.json());

// // CORS for your Vite dev server
// app.use(cors({
//   origin: process.env.CORS_ORIGIN || "*",
//   methods: ["GET", "POST"],
// }));

// // Boolean parser for EMAIL_SECURE
// const isSecure = process.env.EMAIL_SECURE === "true" || process.env.EMAIL_SECURE === "1";

// // One SMTP transporter reused across requests
// const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST,
//   port: Number(process.env.EMAIL_PORT || 465),
//   secure: isSecure, // SSL (465) → true, TLS (587) → false
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // Optional: verify SMTP connection on boot
// transporter.verify()
//   .then(() => console.log("✅ SMTP connection verified"))
//   .catch(err => console.error("❌ SMTP connection failed:", err));

// // Health check
// app.get("/api/health", (_req, res) => res.json({ ok: true }));

// // Utility: simple email regex
// const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

// // Email verification endpoint
// app.post("/api/send-verification", async (req, res) => {
//   try {
//     const { to, code, username } = req.body || {};

//     if (!to || !isValidEmail(to)) {
//       return res.status(400).json({ ok: false, error: "Invalid email" });
//     }
//     if (!code || String(code).length !== 6) {
//       return res.status(400).json({ ok: false, error: "Invalid code format" });
//     }

//     const fromName = process.env.APP_NAME || "Painters' Diary";
//     const from = `"${fromName}" <${process.env.EMAIL_USER}>`;

//     const subject = `${fromName}: Your verification code`;

//     const text = `Hi${username ? " " + username : ""},

// Your verification code is: ${code}

// This code expires in 10 minutes. If you didn't request this, you can ignore this email.

// — ${fromName}`;

//     const html = `
//       <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:520px;margin:auto;padding:24px;">
//         <div style="text-align:center;font-weight:800;font-size:18px;">${fromName}</div>
//         <p>Hi${username ? " <b>" + username + "</b>" : ""},</p>
//         <p>Your email verification code is:</p>
//         <div style="text-align:center;margin:20px 0;">
//           <div style="display:inline-block;font-size:32px;letter-spacing:6px;font-weight:800;border:2px solid #e5e7eb;border-radius:12px;padding:12px 18px;">
//             ${code}
//           </div>
//         </div>
//         <p>This code expires in <b>10 minutes</b>.</p>
//         <p style="color:#6b7280;font-size:12px;margin-top:24px;">If you didn’t request this, you can safely ignore this email.</p>
//         <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;" />
//         <p style="color:#9ca3af;font-size:11px;text-align:center;">© ${new Date().getFullYear()} ${fromName}</p>
//       </div>
//     `;

//     const info = await transporter.sendMail({
//       from,
//       to,
//       subject,
//       text,
//       html,
//       headers: { "X-Entity-Ref-ID": `verify-${Date.now()}` },
//       // replyTo: `support@thepaintersdiary.com`, // optional
//     });

//     return res.status(200).json({ ok: true, id: info.messageId });
//   } catch (err) {
//     console.error("❌ send-verification error:", err);
//     return res.status(500).json({
//       ok: false,
//       error: process.env.NODE_ENV === "development"
//         ? err.message
//         : "Email provider failed",
//     });
//   }
// });

// const PORT = Number(process.env.PORT || 3001);
// app.listen(PORT, () => {
//   console.log(`🚀 Backend running at http://localhost:${PORT}`);
// });











import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();
app.use(express.json());

// Validate required environment variables
const requiredEnvVars = ['EMAIL_HOST', 'EMAIL_PORT', 'EMAIL_USER', 'EMAIL_PASS'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingEnvVars);
  process.exit(1);
}

// CORS configuration - more restrictive in production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.CORS_ORIGIN || process.env.FRONTEND_URL 
    : process.env.CORS_ORIGIN || "http://localhost:3000",
  methods: ["GET", "POST"],
  credentials: true
};

app.use(cors(corsOptions));

// Rate limiting for email endpoints
const emailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: { ok: false, error: "Too many verification attempts" },
  skip: (req) => process.env.NODE_ENV === 'development' // Skip in development
});

// Boolean parser for EMAIL_SECURE
const isSecure = process.env.EMAIL_SECURE === "true" || process.env.EMAIL_SECURE === "1";

// One SMTP transporter reused across requests
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT || 465),
  secure: isSecure, // SSL (465) → true, TLS (587) → false
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  // Additional options for better reliability
  pool: true,
  maxConnections: 5,
  maxMessages: 100,
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

// Optional: verify SMTP connection on boot
transporter.verify()
  .then(() => console.log("✅ SMTP connection verified"))
  .catch(err => {
    console.error("❌ SMTP connection failed:", err.message);
    if (process.env.NODE_ENV === 'production') {
      console.error("Email functionality will be disabled until fixed");
    }
  });

// Health check
app.get("/api/health", (_req, res) => res.json({ 
  ok: true, 
  services: {
    email: transporter ? "configured" : "unavailable"
  }
}));

// Utility: simple email regex
const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

// Email verification endpoint with rate limiting
app.post("/api/send-verification", emailLimiter, async (req, res) => {
  try {
    const { to, code, username } = req.body || {};

    if (!to || !isValidEmail(to)) {
      return res.status(400).json({ ok: false, error: "Invalid email address" });
    }
    if (!code || String(code).length !== 6 || !/^\d+$/.test(code)) {
      return res.status(400).json({ ok: false, error: "Invalid code format" });
    }

    const fromName = process.env.APP_NAME || "Painters' Diary";
    const from = `"${fromName}" <${process.env.EMAIL_USER}>`;

    const subject = `${fromName}: Your verification code`;

    const text = `Hi${username ? " " + username : ""},

Your verification code is: ${code}

This code expires in 10 minutes. If you didn't request this, you can ignore this email.

— ${fromName}`;

    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:520px;margin:auto;padding:24px;">
        <div style="text-align:center;font-weight:800;font-size:18px;">${fromName}</div>
        <p>Hi${username ? " <b>" + username + "</b>" : ""},</p>
        <p>Your email verification code is:</p>
        <div style="text-align:center;margin:20px 0;">
          <div style="display:inline-block;font-size:32px;letter-spacing:6px;font-weight:800;border:2px solid #e5e7eb;border-radius:12px;padding:12px 18px;">
            ${code}
          </div>
        </div>
        <p>This code expires in <b>10 minutes</b>.</p>
        <p style="color:#6b7280;font-size:12px;margin-top:24px;">If you didn't request this, you can safely ignore this email.</p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;" />
        <p style="color:#9ca3af;font-size:11px;text-align:center;">© ${new Date().getFullYear()} ${fromName}</p>
      </div>
    `;

    const info = await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html,
      headers: { "X-Entity-Ref-ID": `verify-${Date.now()}` },
      // replyTo: process.env.SUPPORT_EMAIL || `support@thepaintersdiary.com`,
    });

    console.log(`✅ Verification email sent to: ${to} (${info.messageId})`);

    return res.status(200).json({ ok: true, id: info.messageId });
  } catch (err) {
    console.error("❌ send-verification error:", err);
    
    // More specific error messages
    let errorMessage = "Email provider failed";
    if (err.code === "ECONNREFUSED") {
      errorMessage = "Email service unavailable";
    } else if (err.responseCode === 535) {
      errorMessage = "Email authentication failed";
    }
    
    return res.status(500).json({
      ok: false,
      error: process.env.NODE_ENV === "development" ? err.message : errorMessage,
    });
  }
});

// 404 handler for API routes
app.use("/api/*", (req, res) => {
  res.status(404).json({ ok: false, error: "API endpoint not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Unhandled error:", err);
  res.status(500).json({ 
    ok: false, 
    error: process.env.NODE_ENV === "development" ? err.message : "Internal server error" 
  });
});

const PORT = Number(process.env.PORT || 3001);
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
  console.log(`📧 Email service: ${process.env.EMAIL_HOST}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
});