// import express from "express";
// import cors from "cors";
// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// import rateLimit from "express-rate-limit";

// dotenv.config();

// const app = express();
// app.use(express.json());

// // Simple CORS for development
// app.use(cors({
//   origin: ["http://localhost:5173", "http://localhost:3000", "https://www.thepaintersdiary.com", "https://thepaintersdiary.com", "https://index-nuwjhoz8o-blackbery963s-projects.vercel.app"],
//   credentials: true
// }));

// // Rate limiting
// const emailLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 5,
//   message: { ok: false, error: "Too many verification attempts" },
// });

// // SMTP Configuration with better error handling
// const createTransporter = () => {
//   const config = {
//     host: process.env.EMAIL_HOST || 'smtp.gmail.com',
//     port: parseInt(process.env.EMAIL_PORT) || 587,
//     secure: process.env.EMAIL_SECURE === 'true',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//     // Better timeout settings
//     connectionTimeout: 10000, // 10 seconds
//     greetingTimeout: 10000,
//     socketTimeout: 10000,
//     // Debug info
//     debug: process.env.NODE_ENV === 'development',
//     logger: process.env.NODE_ENV === 'development'
//   };

//   console.log('📧 SMTP Configuration:', {
//     host: config.host,
//     port: config.port,
//     secure: config.secure,
//     user: config.auth.user ? '***' : 'MISSING'
//   });

//   return nodemailer.createTransport(config);
// };

// const transporter = createTransporter();

// // Verify SMTP connection
// const verifySMTP = async () => {
//   try {
//     await transporter.verify();
//     console.log("✅ SMTP connection verified successfully");
//     return true;
//   } catch (error) {
//     console.error("❌ SMTP connection failed:", error.message);
    
//     // Detailed error analysis
//     if (error.code === 'ECONNECTION') {
//       console.log("💡 Check your internet connection and SMTP host/port");
//     } else if (error.code === 'EAUTH') {
//       console.log("💡 Check your email credentials and app password");
//     } else if (error.code === 'ETIMEDOUT') {
//       console.log("💡 Connection timeout - check firewall/antivirus settings");
//     }
    
//     return false;
//   }
// };

// // Verify on startup
// verifySMTP();

// // Health check with SMTP status
// app.get("/api/health", async (_req, res) => {
//   const smtpStatus = await verifySMTP();
//   res.json({ 
//     ok: true, 
//     services: {
//       email: smtpStatus ? "connected" : "disconnected"
//     },
//     timestamp: new Date().toISOString()
//   });
// });

// // Email validation
// const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

// // Fixed endpoint path (removed the ./)
// app.post("/api/send-verification", emailLimiter, async (req, res) => {
//   try {
//     const { to, code, username } = req.body || {};

//     console.log('📨 Received verification request:', { to, code, username });

//     // Validate inputs
//     if (!to || !isValidEmail(to)) {
//       return res.status(400).json({ ok: false, error: "Invalid email address" });
//     }
//     if (!code || String(code).length !== 6 || !/^\d+$/.test(code)) {
//       return res.status(400).json({ ok: false, error: "Invalid code format" });
//     }

//     // Verify SMTP connection before sending
//     const isConnected = await verifySMTP();
//     if (!isConnected) {
//       return res.status(503).json({ 
//         ok: false, 
//         error: "Email service temporarily unavailable" 
//       });
//     }

//     const fromName = process.env.APP_NAME || "Painters' Diary";
//     const from = `"${fromName}" <${process.env.EMAIL_USER}>`;

//     const html = `
// <!DOCTYPE html>
// <html>
// <head>
//   <meta charset="utf-8">
//   <style>
//     body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f8fafc; margin: 0; padding: 20px; }
//     .container { max-width: 500px; background: white; margin: 0 auto; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); }
//     .header { text-align: center; margin-bottom: 30px; }
//     .logo { color: #1f7d53; font-size: 28px; font-weight: bold; margin-bottom: 10px; }
//     .code { background: #f1f5f9; padding: 20px; border-radius: 8px; text-align: center; margin: 25px 0; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #1f7d53; }
//     .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center; color: #64748b; font-size: 12px; }
//   </style>
// </head>
// <body>
//   <div class="container">
//     <div class="header">
//       <div class="logo">🎨 Painters' Diary</div>
//       <h2>Verify Your Email</h2>
//     </div>
    
//     <p>Hi${username ? ` <strong>${username}</strong>` : ''},</p>
    
//     <p>Welcome to Painters' Diary! Use this verification code to complete your registration:</p>
    
//     <div class="code">${code}</div>
    
//     <p>This code will expire in 10 minutes.</p>
    
//     <p>If you didn't request this code, please ignore this email.</p>
    
//     <div class="footer">
//       <p>© ${new Date().getFullYear()} Painters' Diary. All rights reserved.</p>
//     </div>
//   </div>
// </body>
// </html>
//     `;

//     const text = `Painters' Diary Verification Code: ${code}\n\nUse this code to verify your email. It expires in 10 minutes.`;

//     const mailOptions = {
//       from,
//       to,
//       subject: `Your ${fromName} Verification Code`,
//       html,
//       text,
//       // Priority headers
//       headers: {
//         'X-Priority': '1',
//         'X-MSMail-Priority': 'High',
//         'Importance': 'high'
//       }
//     };

//     console.log('📤 Attempting to send email to:', to);
    
//     const info = await transporter.sendMail(mailOptions);
    
//     console.log(`✅ Email sent successfully: ${info.messageId}`);
//     console.log(`📫 To: ${to}, Code: ${code}`);

//     return res.json({ 
//       ok: true, 
//       messageId: info.messageId,
//       message: "Verification email sent successfully"
//     });

//   } catch (error) {
//     console.error("❌ Email sending failed:", error);
    
//     let userMessage = "Failed to send verification email";
    
//     if (error.code === 'EAUTH') {
//       userMessage = "Email authentication failed - check your credentials";
//     } else if (error.code === 'ECONNECTION') {
//       userMessage = "Cannot connect to email service";
//     } else if (error.code === 'ETIMEDOUT') {
//       userMessage = "Email service timeout - please try again";
//     }

//     return res.status(500).json({ 
//       ok: false, 
//       error: userMessage,
//       details: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// });

// // Start server
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`🚀 Email server running on port ${PORT}`);
//   console.log(`📧 Using SMTP: ${process.env.EMAIL_HOST}:${process.env.EMAIL_PORT}`);
//   console.log(`👤 Email user: ${process.env.EMAIL_USER}`);
// });



import nodemailer from "nodemailer";

let transporter;
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 60000;
const MAX_REQUESTS = 5;

// Initialize transporter
function getTransporter() {
  if (!transporter) {
    // Validate environment variables
    const requiredEnvVars = ['EMAIL_HOST', 'EMAIL_PORT', 'EMAIL_USER', 'EMAIL_PASS', 'APP_NAME'];
    const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingEnvVars.length > 0) {
      console.error('❌ Missing environment variables:', missingEnvVars);
      throw new Error(`Missing environment variables: ${missingEnvVars.join(', ')}`);
    }

    console.log('📧 Initializing SMTP transporter...');
    console.log('Host:', process.env.EMAIL_HOST);
    console.log('Port:', process.env.EMAIL_PORT);
    console.log('User:', process.env.EMAIL_USER);
    
    transporter = nodemailer.createTransporter({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      logger: false,
      debug: false,
      pool: true,
      maxConnections: 5,
      maxMessages: 100,
      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 30000,
      tls: {
        rejectUnauthorized: true
      }
    });
  }
  return transporter;
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const { to, code, username } = req.body;

    console.log('📨 Received request:', { to, code: code ? '******' : 'missing', username });

    // Validate input
    if (!to || !code || !username) {
      return res.status(400).json({ ok: false, error: "Missing required fields" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return res.status(400).json({ ok: false, error: "Invalid email format" });
    }

    // Validate code format
    if (!/^\d{6}$/.test(String(code))) {
      return res.status(400).json({ ok: false, error: "Invalid code format" });
    }

    // Rate limiting
    const now = Date.now();
    if (!rateLimit.has(to)) {
      rateLimit.set(to, []);
    }
    
    const requests = rateLimit.get(to).filter(time => now - time < RATE_LIMIT_WINDOW);
    if (requests.length >= MAX_REQUESTS) {
      return res.status(429).json({ ok: false, error: "Too many requests. Please try again later." });
    }
    
    requests.push(now);
    rateLimit.set(to, requests);

    const mailOptions = {
      from: `"${process.env.APP_NAME}" <${process.env.EMAIL_USER}>`,
      to,
      subject: `Your ${process.env.APP_NAME} Verification Code`,
      text: `Hi ${username},\n\nYour verification code is: ${code}\n\nThis code will expire in 10 minutes.\n\nIf you didn't request this, please ignore this email.`,
      html: `
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
      <div class="logo">🎨 ${process.env.APP_NAME}</div>
      <h2>Verify Your Email</h2>
    </div>
    
    <p>Hi <strong>${username}</strong>,</p>
    
    <p>Welcome to ${process.env.APP_NAME}! Use this verification code to complete your registration:</p>
    
    <div class="code">${code}</div>
    
    <p>This code will expire in 10 minutes.</p>
    
    <p>If you didn't request this code, please ignore this email.</p>
    
    <div class="footer">
      <p>© ${new Date().getFullYear()} ${process.env.APP_NAME}. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
      `,
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high'
      }
    };

    console.log('📤 Attempting to send email to:', to);
    
    const transport = getTransporter();
    const info = await transport.sendMail(mailOptions);
    
    console.log("✅ Email sent to:", to, "Message ID:", info.messageId);

    return res.status(200).json({ 
      ok: true, 
      messageId: info.messageId,
      message: "Verification email sent successfully"
    });
    
  } catch (err) {
    console.error("❌ Error sending email:", err);
    
    let errorMessage = "Failed to send verification email";
    let statusCode = 500;
    
    if (err.code === "ECONNREFUSED") {
      errorMessage = "Email service unavailable";
      statusCode = 503;
    } else if (err.code === "EAUTH" || err.responseCode === 535) {
      errorMessage = "Email authentication failed";
      console.error("Check EMAIL_USER and EMAIL_PASS in Vercel environment variables");
    } else if (err.code === "ETIMEDOUT") {
      errorMessage = "Email service timeout";
      statusCode = 504;
    } else if (err.message?.includes('Missing environment variables')) {
      errorMessage = "Server configuration error";
      statusCode = 503;
    }
    
    return res.status(statusCode).json({
      ok: false,
      error: errorMessage,
      details: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
}