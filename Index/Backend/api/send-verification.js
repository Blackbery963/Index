


// import nodemailer from "nodemailer";

// let transporter;
// const rateLimit = new Map();
// const RATE_LIMIT_WINDOW = 60000;
// const MAX_REQUESTS = 5;

// // Allowed origins
// const ALLOWED_ORIGINS = [
//   'https://www.thepaintersdiary.com',
//   'https://thepaintersdiary.com', 
//   'https://api.thepaintersdiary.com',
//   'http://localhost:5173',
//   'http://localhost:3000'
// ];

// // Initialize transporter
// function getTransporter() {
//   if (!transporter) {
//     const requiredEnvVars = ['EMAIL_HOST', 'EMAIL_PORT', 'EMAIL_USER', 'EMAIL_PASS', 'APP_NAME'];
//     const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
//     if (missingEnvVars.length > 0) {
//       console.error('❌ Missing environment variables:', missingEnvVars);
//       throw new Error(`Missing environment variables: ${missingEnvVars.join(', ')}`);
//     }

//     console.log('📧 Initializing SMTP transporter...');
    
//     transporter = nodemailer.createTransporter({
//       host: process.env.EMAIL_HOST,
//       port: Number(process.env.EMAIL_PORT),
//       secure: process.env.EMAIL_SECURE === "true",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//       pool: true,
//       maxConnections: 5,
//       connectionTimeout: 30000,
//       greetingTimeout: 30000,
//       socketTimeout: 30000,
//     });

//     // Verify connection on startup
//     transporter.verify()
//       .then(() => console.log("✅ SMTP connection verified"))
//       .catch(err => console.error("❌ SMTP connection failed:", err.message));
//   }
//   return transporter;
// }

// export default async function handler(req, res) {
//   // ✅ CRITICAL: Set CORS headers for all responses
//   const origin = req.headers.origin;
  
//   if (origin && ALLOWED_ORIGINS.includes(origin)) {
//     res.setHeader('Access-Control-Allow-Origin', origin);
//   }
  

// res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
// res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
// res.setHeader("Access-Control-Allow-Credentials", "true");
// res.setHeader("Access-Control-Max-Age", "86400");

//   // ✅ Handle preflight OPTIONS request
//   if (req.method === 'OPTIONS') {
//     return res.status(200).end();
//   }

//   // Only allow POST for actual requests
//   if (req.method !== 'POST') {
//     return res.status(405).json({ ok: false, error: 'Method not allowed' });
//   }

//   try {
//     const { to, code, username } = req.body;

//     console.log('📨 Received verification request:', { to, code: code ? '******' : 'missing', username });

//     // Validate input
//     if (!to || !code || !username) {
//       return res.status(400).json({ ok: false, error: 'Missing required fields' });
//     }

//     // Validate email format
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(to)) {
//       return res.status(400).json({ ok: false, error: 'Invalid email format' });
//     }

//     // Validate code format
//     if (!/^\d{6}$/.test(String(code))) {
//       return res.status(400).json({ ok: false, error: 'Invalid code format' });
//     }

//     // Rate limiting
//     const now = Date.now();
//     if (!rateLimit.has(to)) {
//       rateLimit.set(to, []);
//     }
    
//     const requests = rateLimit.get(to).filter(time => now - time < RATE_LIMIT_WINDOW);
//     if (requests.length >= MAX_REQUESTS) {
//       return res.status(429).json({ ok: false, error: 'Too many requests. Please try again later.' });
//     }
    
//     requests.push(now);
//     rateLimit.set(to, requests);

//     // Send email
//     const mailOptions = {
//       from: `"${process.env.APP_NAME}" <${process.env.EMAIL_USER}>`,
//       to,
//       subject: `Your ${process.env.APP_NAME} Verification Code`,
//       html: `
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
//       <div class="logo">🎨 ${process.env.APP_NAME}</div>
//       <h2>Verify Your Email</h2>
//     </div>
    
//     <p>Hi <strong>${username}</strong>,</p>
    
//     <p>Welcome to ${process.env.APP_NAME}! Use this verification code to complete your registration:</p>
    
//     <div class="code">${code}</div>
    
//     <p>This code will expire in 10 minutes.</p>
    
//     <p>If you didn't request this code, please ignore this email.</p>
    
//     <div class="footer">
//       <p>© ${new Date().getFullYear()} ${process.env.APP_NAME}. All rights reserved.</p>
//     </div>
//   </div>
// </body>
// </html>
//       `,
//       text: `Hi ${username},\n\nYour ${process.env.APP_NAME} verification code is: ${code}\n\nThis code will expire in 10 minutes.\n\nIf you didn't request this, please ignore this email.`
//     };

//     console.log('📤 Sending email to:', to);
    
//     const transport = getTransporter();
//     const info = await transport.sendMail(mailOptions);
    
//     console.log('✅ Email sent successfully:', info.messageId);

//     return res.status(200).json({ 
//       ok: true, 
//       messageId: info.messageId,
//       message: 'Verification email sent successfully'
//     });
    
//   } catch (err) {
//     console.error('❌ Email sending failed:', err);
    
//     let errorMessage = 'Failed to send verification email';
//     let statusCode = 500;
    
//     if (err.code === 'ECONNREFUSED') {
//       errorMessage = 'Email service unavailable';
//       statusCode = 503;
//     } else if (err.code === 'EAUTH') {
//       errorMessage = 'Email authentication failed';
//     } else if (err.code === 'ETIMEDOUT') {
//       errorMessage = 'Email service timeout';
//       statusCode = 504;
//     }
    
//     return res.status(statusCode).json({
//       ok: false,
//       error: errorMessage
//     });
//   }
// }

import nodemailer from "nodemailer";

const ALLOWED_ORIGINS = [
  "https://www.thepaintersdiary.com",
  "https://thepaintersdiary.com",
  "https://api.thepaintersdiary.com",
  "http://localhost:5173",
  "http://localhost:3000"
];

let transporter;

function getTransporter() {
  if (!transporter) {
    const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, APP_NAME } = process.env;
    if (!EMAIL_HOST || !EMAIL_PORT || !EMAIL_USER || !EMAIL_PASS || !APP_NAME) {
      throw new Error("Missing required email configuration in environment variables.");
    }

    transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: Number(EMAIL_PORT),
      secure: process.env.EMAIL_SECURE === "true",
      auth: { user: EMAIL_USER, pass: EMAIL_PASS },
      pool: true,
      maxConnections: 3,
      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 30000,
    });

    transporter.verify()
      .then(() => console.log("✅ SMTP verified"))
      .catch(err => console.error("❌ SMTP failed:", err.message));
  }
  return transporter;
}

export default async function handler(req, res) {
  // ✅ CORS setup
  const origin = req.headers.origin || "";
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    // default fallback (optional for safety)
    res.setHeader("Access-Control-Allow-Origin", "https://www.thepaintersdiary.com");
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "86400");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  try {
    const { to, code, username } = req.body;

    if (!to || !code || !username) {
      return res.status(400).json({ ok: false, error: "Missing required fields" });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
      return res.status(400).json({ ok: false, error: "Invalid email format" });
    }

    if (!/^\d{6}$/.test(String(code))) {
      return res.status(400).json({ ok: false, error: "Invalid code format" });
    }

    const appName = process.env.APP_NAME || "Painters' Diary";
    const mailOptions = {
      from: `"${appName}" <${process.env.EMAIL_USER}>`,
      to,
      subject: `Your ${appName} Verification Code`,
      html: `
      <html>
        <head>
          <meta charset="utf-8" />
          <title>${appName} Verification</title>
        </head>
        <body style="font-family: Arial, sans-serif; background:#f8fafc; padding:20px;">
          <div style="max-width:480px; background:white; margin:auto; padding:30px; border-radius:12px; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
            <h2 style="color:#1f7d53; text-align:center;">🎨 ${appName}</h2>
            <p>Hi <strong>${username}</strong>,</p>
            <p>Welcome to ${appName}! Use this code to verify your email:</p>
            <div style="text-align:center; background:#f1f5f9; padding:15px; border-radius:8px; font-size:28px; font-weight:bold; color:#1f7d53; letter-spacing:6px;">
              ${code}
            </div>
            <p>This code expires in 10 minutes.</p>
            <p>If you didn’t request this, you can ignore this email.</p>
            <footer style="border-top:1px solid #e2e8f0; margin-top:20px; text-align:center; color:#64748b; font-size:12px;">
              © ${new Date().getFullYear()} ${appName}. All rights reserved.
            </footer>
          </div>
        </body>
      </html>
      `,
      text: `Hi ${username},\n\nYour ${appName} verification code is: ${code}\n\nExpires in 10 minutes.\n\nIf you didn't request this, ignore this email.`
    };

    const transporter = getTransporter();
    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Email sent to:", to);
    return res.status(200).json({
      ok: true,
      messageId: info.messageId,
      message: "Verification email sent successfully",
    });
  } catch (err) {
    console.error("❌ Email send error:", err);
    return res.status(500).json({
      ok: false,
      error: "Internal server error while sending email.",
    });
  }
}
