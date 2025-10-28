// import nodemailer from "nodemailer";

// const ALLOWED_ORIGINS = [
//   "https://www.thepaintersdiary.com",
//   "https://thepaintersdiary.com",
//   "https://api.thepaintersdiary.com",
//   "http://localhost:5173",
//   "http://localhost:3000"
// ];

// let transporter;

// function getTransporter() {
//   if (!transporter) {
//     const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, APP_NAME } = process.env;
//     if (!EMAIL_HOST || !EMAIL_PORT || !EMAIL_USER || !EMAIL_PASS || !APP_NAME) {
//       throw new Error("Missing required email configuration in environment variables.");
//     }

//     transporter = nodemailer.createTransport({
//       host: EMAIL_HOST,
//       port: Number(EMAIL_PORT),
//       secure: process.env.EMAIL_SECURE === "true",
//       auth: { user: EMAIL_USER, pass: EMAIL_PASS },
//       pool: true,
//       maxConnections: 3,
//       connectionTimeout: 30000,
//       greetingTimeout: 30000,
//       socketTimeout: 30000,
//     });

//     transporter.verify()
//       .then(() => console.log("✅ SMTP verified"))
//       .catch(err => console.error("❌ SMTP failed:", err.message));
//   }
//   return transporter;
// }

// export default async function handler(req, res) {
//   // ✅ CORS setup
//   const origin = req.headers.origin || "";
//   if (ALLOWED_ORIGINS.includes(origin)) {
//     res.setHeader("Access-Control-Allow-Origin", origin);
//   } else {
//     // default fallback (optional for safety)
//     res.setHeader("Access-Control-Allow-Origin", "https://www.thepaintersdiary.com");
//   }

//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader("Access-Control-Max-Age", "86400");

//   if (req.method === "OPTIONS") {
//     return res.status(200).end();
//   }

//   if (req.method !== "POST") {
//     return res.status(405).json({ ok: false, error: "Method Not Allowed" });
//   }

//   try {
//     const { to, code, username } = req.body;

//     if (!to || !code || !username) {
//       return res.status(400).json({ ok: false, error: "Missing required fields" });
//     }

//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
//       return res.status(400).json({ ok: false, error: "Invalid email format" });
//     }

//     if (!/^\d{6}$/.test(String(code))) {
//       return res.status(400).json({ ok: false, error: "Invalid code format" });
//     }

//     const appName = process.env.APP_NAME || "Painters' Diary";
//     const mailOptions = {
//       from: `"${appName}" <${process.env.EMAIL_USER}>`,
//       to,
//       subject: `Your ${appName} Verification Code`,
//       html: `
//       <html>
//         <head>
//           <meta charset="utf-8" />
//           <title>${appName} Verification</title>
//         </head>
//         <body style="font-family: Arial, sans-serif; background:#f8fafc; padding:20px;">
//           <div style="max-width:480px; background:white; margin:auto; padding:30px; border-radius:12px; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
//             <h2 style="color:#1f7d53; text-align:center;">🎨 ${appName}</h2>
//             <p>Hi <strong>${username}</strong>,</p>
//             <p>Welcome to ${appName}! Use this code to verify your email:</p>
//             <div style="text-align:center; background:#f1f5f9; padding:15px; border-radius:8px; font-size:28px; font-weight:bold; color:#1f7d53; letter-spacing:6px;">
//               ${code}
//             </div>
//             <p>This code expires in 10 minutes.</p>
//             <p>If you didn’t request this, you can ignore this email.</p>
//             <footer style="border-top:1px solid #e2e8f0; margin-top:20px; text-align:center; color:#64748b; font-size:12px;">
//               © ${new Date().getFullYear()} ${appName}. All rights reserved.
//             </footer>
//           </div>
//         </body>
//       </html>
//       `,
//       text: `Hi ${username},\n\nYour ${appName} verification code is: ${code}\n\nExpires in 10 minutes.\n\nIf you didn't request this, ignore this email.`
//     };

//     const transporter = getTransporter();
//     const info = await transporter.sendMail(mailOptions);

//     console.log("✅ Email sent to:", to);
//     return res.status(200).json({
//       ok: true,
//       messageId: info.messageId,
//       message: "Verification email sent successfully",
//     });
//   } catch (err) {
//     console.error("❌ Email send error:", err);
//     return res.status(500).json({
//       ok: false,
//       error: "Internal server error while sending email.",
//     });
//   }
// }


import nodemailer from "nodemailer";

// CORS headers for Vercel
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://www.thepaintersdiary.com',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Max-Age': '86400'
};

// Rate limiting storage (in-memory for serverless)
const rateLimitMap = new Map();

const checkRateLimit = (ip) => {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const max = 5;
  
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return true;
  }
  
  const data = rateLimitMap.get(ip);
  
  // Reset if window has passed
  if (now - data.lastReset > windowMs) {
    data.count = 1;
    data.lastReset = now;
    return true;
  }
  
  // Check if under limit
  if (data.count < max) {
    data.count++;
    return true;
  }
  
  return false;
};

// SMTP Configuration
const createTransporter = () => {
  const config = {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
  };

  return nodemailer.createTransport(config);
};

const transporter = createTransporter();

// Email validation
const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

export default async function handler(req, res) {
  // Set CORS headers for all responses
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  // Handle OPTIONS request (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      ok: false, 
      error: 'Method not allowed' 
    });
  }

  try {
    // Simple rate limiting based on IP
    const clientIp = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown';
    if (!checkRateLimit(clientIp)) {
      return res.status(429).json({
        ok: false,
        error: "Too many verification attempts. Please try again in 15 minutes."
      });
    }

    const { to, code, username } = req.body;

    console.log('📨 Received verification request:', { to, code, username });

    // Validate inputs
    if (!to || !isValidEmail(to)) {
      return res.status(400).json({ 
        ok: false, 
        error: "Invalid email address" 
      });
    }
    
    if (!code || String(code).length !== 6 || !/^\d+$/.test(code)) {
      return res.status(400).json({ 
        ok: false, 
        error: "Invalid code format" 
      });
    }

    // Verify SMTP connection
    try {
      await transporter.verify();
    } catch (smtpError) {
      console.error("❌ SMTP connection failed:", smtpError.message);
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
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high'
      }
    };

    console.log('📤 Attempting to send email to:', to);
    
    const info = await transporter.sendMail(mailOptions);
    
    console.log(`✅ Email sent successfully: ${info.messageId}`);

    return res.status(200).json({ 
      ok: true, 
      messageId: info.messageId,
      message: "Verification email sent successfully"
    });

  } catch (error) {
    console.error("❌ Email sending failed:", error);
    
    let userMessage = "Failed to send verification email";
    
    if (error.code === 'EAUTH') {
      userMessage = "Email authentication failed";
    } else if (error.code === 'ECONNECTION') {
      userMessage = "Cannot connect to email service";
    } else if (error.code === 'ETIMEDOUT') {
      userMessage = "Email service timeout - please try again";
    }

    return res.status(500).json({ 
      ok: false, 
      error: userMessage
    });
  }
}