import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();
app.use(express.json());

// Simple CORS for development
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000", "https://www.thepaintersdiary.com", "https://thepaintersdiary.com", "https://index-nuwjhoz8o-blackbery963s-projects.vercel.app", "https://api.thepaintersdiary.com"],
  credentials: true
}));

// Rate limiting
const emailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { ok: false, error: "Too many verification attempts" },
});

// SMTP Configuration with better error handling
const createTransporter = () => {
  const config = {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // Better timeout settings
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 10000,
    socketTimeout: 10000,
    // Debug info
    debug: process.env.NODE_ENV === 'development',
    logger: process.env.NODE_ENV === 'development'
  };

  console.log('📧 SMTP Configuration:', {
    host: config.host,
    port: config.port,
    secure: config.secure,
    user: config.auth.user ? '***' : 'MISSING'
  });

  return nodemailer.createTransport(config);
};

const transporter = createTransporter();

// Verify SMTP connection
const verifySMTP = async () => {
  try {
    await transporter.verify();
    console.log("✅ SMTP connection verified successfully");
    return true;
  } catch (error) {
    console.error("❌ SMTP connection failed:", error.message);
    
    // Detailed error analysis
    if (error.code === 'ECONNECTION') {
      console.log("💡 Check your internet connection and SMTP host/port");
    } else if (error.code === 'EAUTH') {
      console.log("💡 Check your email credentials and app password");
    } else if (error.code === 'ETIMEDOUT') {
      console.log("💡 Connection timeout - check firewall/antivirus settings");
    }
    
    return false;
  }
};

// Verify on startup
verifySMTP();

// Health check with SMTP status
app.get("/api/health", async (_req, res) => {
  const smtpStatus = await verifySMTP();
  res.json({ 
    ok: true, 
    services: {
      email: smtpStatus ? "connected" : "disconnected"
    },
    timestamp: new Date().toISOString()
  });
});

// Email validation
const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

// Fixed endpoint path (removed the ./)
app.post("/api/send-verification", emailLimiter, async (req, res) => {
  try {
    const { to, code, username } = req.body || {};

    console.log('📨 Received verification request:', { to, code, username });

    // Validate inputs
    if (!to || !isValidEmail(to)) {
      return res.status(400).json({ ok: false, error: "Invalid email address" });
    }
    if (!code || String(code).length !== 6 || !/^\d+$/.test(code)) {
      return res.status(400).json({ ok: false, error: "Invalid code format" });
    }

    // Verify SMTP connection before sending
    const isConnected = await verifySMTP();
    if (!isConnected) {
      return res.status(503).json({ 
        ok: false, 
        error: "Email service temporarily unavailable" 
      });
    }

    const fromName = process.env.APP_NAME || "Painters' Diary";
    const from = `"${fromName}" <${process.env.EMAIL_USER}>`;

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f8fafc; margin: 0; padding: 20px; }
    .container { max-width: 500px; background: white; margin: 0 auto; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); }
    .header { text-align: center; margin-bottom: 30px; }
    .logo { color: #1f7d53; font-size: 28px; font-weight: bold; margin-bottom: 10px; }
    .code { background: #f1f5f9; padding: 20px; border-radius: 8px; text-align: center; margin: 25px 0; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #1f7d53; }
    .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center; color: #64748b; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">🎨 Painters' Diary</div>
      <h2>Verify Your Email</h2>
    </div>
    
    <p>Hi${username ? ` <strong>${username}</strong>` : ''},</p>
    
    <p>Welcome to Painters' Diary! Use this verification code to complete your registration:</p>
    
    <div class="code">${code}</div>
    
    <p>This code will expire in 10 minutes.</p>
    
    <p>If you didn't request this code, please ignore this email.</p>
    
    <div class="footer">
      <p>© ${new Date().getFullYear()} Painters' Diary. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `;

    const text = `Painters' Diary Verification Code: ${code}\n\nUse this code to verify your email. It expires in 10 minutes.`;

    const mailOptions = {
      from,
      to,
      subject: `Your ${fromName} Verification Code`,
      html,
      text,
      // Priority headers
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high'
      }
    };

    console.log('📤 Attempting to send email to:', to);
    
    const info = await transporter.sendMail(mailOptions);
    
    console.log(`✅ Email sent successfully: ${info.messageId}`);
    console.log(`📫 To: ${to}, Code: ${code}`);

    return res.json({ 
      ok: true, 
      messageId: info.messageId,
      message: "Verification email sent successfully"
    });

  } catch (error) {
    console.error("❌ Email sending failed:", error);
    
    let userMessage = "Failed to send verification email";
    
    if (error.code === 'EAUTH') {
      userMessage = "Email authentication failed - check your credentials";
    } else if (error.code === 'ECONNECTION') {
      userMessage = "Cannot connect to email service";
    } else if (error.code === 'ETIMEDOUT') {
      userMessage = "Email service timeout - please try again";
    }

    return res.status(500).json({ 
      ok: false, 
      error: userMessage,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Email server running on port ${PORT}`);
  console.log(`📧 Using SMTP: ${process.env.EMAIL_HOST}:${process.env.EMAIL_PORT}`);
  console.log(`👤 Email user: ${process.env.EMAIL_USER}`);
});



