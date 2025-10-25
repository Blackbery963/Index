// // // import nodemailer from "nodemailer";

// // // let transporter;
// // // const rateLimit = new Map();
// // // const RATE_LIMIT_WINDOW = 60000;
// // // const MAX_REQUESTS = 5;

// // // function getTransporter() {
// // //   if (!transporter) {
// // //     // Validate environment variables first
// // //     const requiredEnvVars = ['EMAIL_HOST', 'EMAIL_PORT', 'EMAIL_USER', 'EMAIL_PASS', 'APP_NAME'];
// // //     const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
// // //     if (missingEnvVars.length > 0) {
// // //       throw new Error(`Missing environment variables: ${missingEnvVars.join(', ')}`);
// // //     }

// // //     transporter = nodemailer.createTransport({
// // //       host: process.env.EMAIL_HOST,
// // //       port: Number(process.env.EMAIL_PORT),
// // //       secure: process.env.EMAIL_SECURE === "true",
// // //       auth: {
// // //         user: process.env.EMAIL_USER,
// // //         pass: process.env.EMAIL_PASS,
// // //       },
// // //       // Additional options for better delivery
// // //       tls: {
// // //         rejectUnauthorized: false // Might help with self-signed certificates
// // //       },
// // //       connectionTimeout: 20000,
// // //       greetingTimeout: 20000
// // //     });
// // //   }
// // //   return transporter;
// // // }

// // // export default async function handler(req, res) {
// // //   if (req.method !== "POST") {
// // //     return res.status(405).json({ ok: false, error: "Method not allowed" });
// // //   }

// // //   try {
// // //     const { to, code, username } = req.body;

// // //     // Validate input
// // //     if (!to || !code || !username) {
// // //       return res.status(400).json({ ok: false, error: "Missing required fields" });
// // //     }

// // //     // Validate email format
// // //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// // //     if (!emailRegex.test(to)) {
// // //       return res.status(400).json({ ok: false, error: "Invalid email format" });
// // //     }

// // //     // Rate limiting
// // //     const now = Date.now();
// // //     if (!rateLimit.has(to)) {
// // //       rateLimit.set(to, []);
// // //     }
    
// // //     const requests = rateLimit.get(to).filter(time => now - time < RATE_LIMIT_WINDOW);
// // //     if (requests.length >= MAX_REQUESTS) {
// // //       return res.status(429).json({ ok: false, error: "Too many requests. Please try again later." });
// // //     }
    
// // //     rateLimit.get(to).push(now);
// // //     // Clean up old entries periodically
// // //     if (Math.random() < 0.1) { // 10% chance to clean up
// // //       for (const [email, times] of rateLimit.entries()) {
// // //         rateLimit.set(email, times.filter(time => now - time < RATE_LIMIT_WINDOW * 10));
// // //       }
// // //     }

// // //     // Verify SMTP connection
// // //     try {
// // //       await getTransporter().verify();
// // //     } catch (verifyError) {
// // //       console.error("❌ SMTP connection failed:", verifyError);
// // //       return res.status(500).json({
// // //         ok: false,
// // //         error: "Email service temporarily unavailable"
// // //       });
// // //     }

// // //     const mailOptions = {
// // //       from: `"${process.env.APP_NAME}" <${process.env.EMAIL_USER}>`,
// // //       to,
// // //       subject: `Verify your email - ${process.env.APP_NAME}`,
// // //       text: `Hi ${username},\n\nYour verification code is: ${code}\n\nThis code will expire in 10 minutes.`,
// // //       html: `
// // //         <div style="font-family: Arial, sans-serif; padding:20px; color:#333;">
// // //           <h2>Welcome to ${process.env.APP_NAME} 🎨</h2>
// // //           <p>Hi <b>${username}</b>,</p>
// // //           <p>Thank you for signing up! Use the code below to verify your email:</p>
// // //           <div style="margin:20px 0; padding:10px; background:#f4f4f4; display:inline-block; font-size:20px; font-weight:bold; border-radius:6px;">
// // //             ${code}
// // //           </div>
// // //           <p>This code will expire in <b>10 minutes</b>.</p>
// // //           <p>If you didn't request this, please ignore this email.</p>
// // //           <br/>
// // //           <p style="font-size:12px; color:#888;">© ${new Date().getFullYear()} ${process.env.APP_NAME}</p>
// // //         </div>
// // //       `,
// // //       // Add headers to improve deliverability
// // //       headers: {
// // //         'X-Priority': '3',
// // //         'X-Mailer': 'Node.js',
// // //         'List-Unsubscribe': `<mailto:${process.env.EMAIL_USER}?subject=Unsubscribe>`
// // //       }
// // //     };

// // //     const info = await getTransporter().sendMail(mailOptions);

// // //     console.log("✅ Email sent to:", to, "Message ID:", info.messageId);

// // //     return res.status(200).json({ ok: true, id: info.messageId });
// // //   } catch (err) {
// // //     console.error("❌ Error sending email to:", req.body.to, "Error:", err);

// // //     return res.status(500).json({
// // //       ok: false,
// // //       error: process.env.NODE_ENV === "development" ? err.message : "Failed to send verification email"
// // //     });
// // //   }
// // // }




// // import nodemailer from "nodemailer";

// // let transporter;
// // const rateLimit = new Map();
// // const RATE_LIMIT_WINDOW = 60000;
// // const MAX_REQUESTS = 5;

// // // Initialize transporter once at module load
// // function initializeTransporter() {
// //   if (!transporter) {
// //     // Validate environment variables first
// //     const requiredEnvVars = ['EMAIL_HOST', 'EMAIL_PORT', 'EMAIL_USER', 'EMAIL_PASS', 'APP_NAME'];
// //     const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
// //     if (missingEnvVars.length > 0) {
// //       console.error('❌ Missing environment variables:', missingEnvVars);
// //       throw new Error(`Missing environment variables: ${missingEnvVars.join(', ')}`);
// //     }

// //     console.log('📧 Initializing SMTP transporter...');
// //     console.log('Host:', process.env.EMAIL_HOST);
// //     console.log('Port:', process.env.EMAIL_PORT);
// //     console.log('User:', process.env.EMAIL_USER);
    
// //     transporter = nodemailer.createTransport({
// //       host: process.env.EMAIL_HOST,
// //       port: Number(process.env.EMAIL_PORT),
// //       secure: process.env.EMAIL_SECURE === "false",
// //       auth: {
// //         user: process.env.EMAIL_USER,
// //         pass: process.env.EMAIL_PASS,
// //       },
// //       logger: true,  // enable logging
// //       debug: true,   // show connection details
// //       // Better connection settings
// //       pool: true, // Use connection pooling
// //       maxConnections: 5,
// //       maxMessages: 100,
// //       connectionTimeout: 100000, // 30 seconds
// //       greetingTimeout: 30000,
// //       socketTimeout: 30000,
// //       // Retry mechanism
// //       retries: 3,
// //       // TLS options
// //       tls: {
// //         rejectUnauthorized: false // Helps with self-signed certificates
// //       }
// //     });

// //     // Verify connection once on startup
// //     transporter.verify()
// //       .then(() => console.log("✅ SMTP connection verified"))
// //       .catch(err => {
// //         console.error("❌ SMTP connection failed:", err.message);
// //         console.error("Please check your SMTP settings in environment variables");
// //       });
// //   }
// //   return transporter;
// // }

// // // Initialize immediately
// // initializeTransporter();

// // export default async function handler(req, res) {
// //   if (req.method !== "POST") {
// //     return res.status(405).json({ ok: false, error: "Method not allowed" });
// //   }

// //   try {
// //     const { to, code, username } = req.body;

// //     // Validate input
// //     if (!to || !code || !username) {
// //       return res.status(400).json({ ok: false, error: "Missing required fields" });
// //     }

// //     // Validate email format
// //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //     if (!emailRegex.test(to)) {
// //       return res.status(400).json({ ok: false, error: "Invalid email format" });
// //     }

// //     // Rate limiting
// //     const now = Date.now();
// //     if (!rateLimit.has(to)) {
// //       rateLimit.set(to, []);
// //     }
    
// //     const requests = rateLimit.get(to).filter(time => now - time < RATE_LIMIT_WINDOW);
// //     if (requests.length >= MAX_REQUESTS) {
// //       return res.status(429).json({ ok: false, error: "Too many requests. Please try again later." });
// //     }
    
// //     rateLimit.get(to).push(now);
    
// //     // Clean up old entries periodically
// //     if (Math.random() < 0.1) {
// //       for (const [email, times] of rateLimit.entries()) {
// //         rateLimit.set(email, times.filter(time => now - time < RATE_LIMIT_WINDOW * 10));
// //       }
// //     }

// //     const mailOptions = {
// //       from: `"${process.env.APP_NAME}" <${process.env.EMAIL_USER}>`,
// //       to,
// //       subject: `Verify your email - ${process.env.APP_NAME}`,
// //       text: `Hi ${username},\n\nYour verification code is: ${code}\n\nThis code will expire in 10 minutes.`,
// //       html: `
// //         <div style="font-family: Arial, sans-serif; padding:20px; color:#333;">
// //           <h2>Welcome to ${process.env.APP_NAME} 🎨</h2>
// //           <p>Hi <b>${username}</b>,</p>
// //           <p>Thank you for signing up! Use the code below to verify your email:</p>
// //           <div style="margin:20px 0; padding:10px; background:#f4f4f4; display:inline-block; font-size:20px; font-weight:bold; border-radius:6px;">
// //             ${code}
// //           </div>
// //           <p>This code will expire in <b>10 minutes</b>.</p>
// //           <p>If you didn't request this, please ignore this email.</p>
// //           <br/>
// //           <p style="font-size:12px; color:#888;">© ${new Date().getFullYear()} ${process.env.APP_NAME}</p>
// //         </div>
// //       `,
// //       headers: {
// //         'X-Priority': '3',
// //         'X-Mailer': 'Node.js',
// //         'List-Unsubscribe': `<mailto:${process.env.EMAIL_USER}?subject=Unsubscribe>`
// //       }
// //     };

// //     const info = await getTransporter().sendMail(mailOptions);
// //     console.log("✅ Email sent to:", to, "Message ID:", info.messageId);

// //     return res.status(200).json({ ok: true, id: info.messageId });
    
// //   } catch (err) {
// //     console.error("❌ Error sending email:", err.message);
    
// //     // Specific error handling
// //     let errorMessage = "Failed to send verification email";
// //     let statusCode = 500;
    
// //     if (err.code === "ECONNREFUSED") {
// //       errorMessage = "Email service unavailable. Please try again later.";
// //       statusCode = 503; // Service Unavailable
// //     } else if (err.responseCode === 535) {
// //       errorMessage = "Email authentication failed. Please check server configuration.";
// //     } else if (err.code === "ETIMEDOUT") {
// //       errorMessage = "Email service timeout. Please try again.";
// //       statusCode = 504; // Gateway Timeout
// //     }
    
// //     return res.status(statusCode).json({
// //       ok: false,
// //       error: process.env.NODE_ENV === "development" ? err.message : errorMessage
// //     });
// //   }
// // }

// // function getTransporter() {
// //   if (!transporter) {
// //     throw new Error("SMTP transporter not initialized. Check environment variables.");
// //   }
// //   return transporter;
// // }


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
//       logger: false,
//       debug: false,
//       pool: true,
//       maxConnections: 5,
//       maxMessages: 100,
//       connectionTimeout: 30000,
//       greetingTimeout: 30000,
//       socketTimeout: 30000,
//       tls: {
//         rejectUnauthorized: true
//       }
//     });
//   }
//   return transporter;
// }

// export default async function handler(req, res) {
//   // Get origin from request
//   const origin = req.headers.origin;
  
//   // Set CORS headers
//   if (origin && ALLOWED_ORIGINS.includes(origin)) {
//     res.setHeader('Access-Control-Allow-Origin', origin);
//   } else if (process.env.NODE_ENV === 'development') {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//   }
  
//   res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours

//   // Handle preflight OPTIONS request
//   if (req.method === 'OPTIONS') {
//     return res.status(200).end();
//   }

//   if (req.method !== "POST") {
//     return res.status(405).json({ ok: false, error: "Method not allowed" });
//   }

//   try {
//     const { to, code, username } = req.body;

//     console.log('📨 Received request:', { to, code: code ? '******' : 'missing', username });

//     // Validate input
//     if (!to || !code || !username) {
//       return res.status(400).json({ ok: false, error: "Missing required fields" });
//     }

//     // Validate email format
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(to)) {
//       return res.status(400).json({ ok: false, error: "Invalid email format" });
//     }

//     // Validate code format
//     if (!/^\d{6}$/.test(String(code))) {
//       return res.status(400).json({ ok: false, error: "Invalid code format" });
//     }

//     // Rate limiting
//     const now = Date.now();
//     if (!rateLimit.has(to)) {
//       rateLimit.set(to, []);
//     }
    
//     const requests = rateLimit.get(to).filter(time => now - time < RATE_LIMIT_WINDOW);
//     if (requests.length >= MAX_REQUESTS) {
//       return res.status(429).json({ ok: false, error: "Too many requests. Please try again later." });
//     }
    
//     requests.push(now);
//     rateLimit.set(to, requests);

//     const mailOptions = {
//       from: `"${process.env.APP_NAME}" <${process.env.EMAIL_USER}>`,
//       to,
//       subject: `Your ${process.env.APP_NAME} Verification Code`,
//       text: `Hi ${username},\n\nYour verification code is: ${code}\n\nThis code will expire in 10 minutes.\n\nIf you didn't request this, please ignore this email.`,
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
//       headers: {
//         'X-Priority': '1',
//         'X-MSMail-Priority': 'High',
//         'Importance': 'high'
//       }
//     };

//     console.log('📤 Attempting to send email to:', to);
    
//     const transport = getTransporter();
//     const info = await transport.sendMail(mailOptions);
    
//     console.log("✅ Email sent to:", to, "Message ID:", info.messageId);

//     return res.status(200).json({ 
//       ok: true, 
//       messageId: info.messageId,
//       message: "Verification email sent successfully"
//     });
    
//   } catch (err) {
//     console.error("❌ Error sending email:", err);
    
//     let errorMessage = "Failed to send verification email";
//     let statusCode = 500;
    
//     if (err.code === "ECONNREFUSED") {
//       errorMessage = "Email service unavailable";
//       statusCode = 503;
//     } else if (err.code === "EAUTH" || err.responseCode === 535) {
//       errorMessage = "Email authentication failed";
//       console.error("Check EMAIL_USER and EMAIL_PASS in Vercel environment variables");
//     } else if (err.code === "ETIMEDOUT") {
//       errorMessage = "Email service timeout";
//       statusCode = 504;
//     } else if (err.message?.includes('Missing environment variables')) {
//       errorMessage = "Server configuration error";
//       statusCode = 503;
//     }
    
//     return res.status(statusCode).json({
//       ok: false,
//       error: errorMessage,
//       details: process.env.NODE_ENV === "development" ? err.message : undefined
//     });
//   }
// }



import nodemailer from "nodemailer";

let transporter;
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 60000;
const MAX_REQUESTS = 5;

// Allowed origins
const ALLOWED_ORIGINS = [
  'https://www.thepaintersdiary.com',
  'https://thepaintersdiary.com', 
  'https://api.thepaintersdiary.com',
  'http://localhost:5173',
  'http://localhost:3000'
];

// Initialize transporter
function getTransporter() {
  if (!transporter) {
    const requiredEnvVars = ['EMAIL_HOST', 'EMAIL_PORT', 'EMAIL_USER', 'EMAIL_PASS', 'APP_NAME'];
    const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingEnvVars.length > 0) {
      console.error('❌ Missing environment variables:', missingEnvVars);
      throw new Error(`Missing environment variables: ${missingEnvVars.join(', ')}`);
    }

    console.log('📧 Initializing SMTP transporter...');
    
    transporter = nodemailer.createTransporter({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      pool: true,
      maxConnections: 5,
      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 30000,
    });

    // Verify connection on startup
    transporter.verify()
      .then(() => console.log("✅ SMTP connection verified"))
      .catch(err => console.error("❌ SMTP connection failed:", err.message));
  }
  return transporter;
}

export default async function handler(req, res) {
  // ✅ CRITICAL: Set CORS headers for all responses
  const origin = req.headers.origin;
  
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '86400');

  // ✅ Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST for actual requests
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const { to, code, username } = req.body;

    console.log('📨 Received verification request:', { to, code: code ? '******' : 'missing', username });

    // Validate input
    if (!to || !code || !username) {
      return res.status(400).json({ ok: false, error: 'Missing required fields' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return res.status(400).json({ ok: false, error: 'Invalid email format' });
    }

    // Validate code format
    if (!/^\d{6}$/.test(String(code))) {
      return res.status(400).json({ ok: false, error: 'Invalid code format' });
    }

    // Rate limiting
    const now = Date.now();
    if (!rateLimit.has(to)) {
      rateLimit.set(to, []);
    }
    
    const requests = rateLimit.get(to).filter(time => now - time < RATE_LIMIT_WINDOW);
    if (requests.length >= MAX_REQUESTS) {
      return res.status(429).json({ ok: false, error: 'Too many requests. Please try again later.' });
    }
    
    requests.push(now);
    rateLimit.set(to, requests);

    // Send email
    const mailOptions = {
      from: `"${process.env.APP_NAME}" <${process.env.EMAIL_USER}>`,
      to,
      subject: `Your ${process.env.APP_NAME} Verification Code`,
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
      text: `Hi ${username},\n\nYour ${process.env.APP_NAME} verification code is: ${code}\n\nThis code will expire in 10 minutes.\n\nIf you didn't request this, please ignore this email.`
    };

    console.log('📤 Sending email to:', to);
    
    const transport = getTransporter();
    const info = await transport.sendMail(mailOptions);
    
    console.log('✅ Email sent successfully:', info.messageId);

    return res.status(200).json({ 
      ok: true, 
      messageId: info.messageId,
      message: 'Verification email sent successfully'
    });
    
  } catch (err) {
    console.error('❌ Email sending failed:', err);
    
    let errorMessage = 'Failed to send verification email';
    let statusCode = 500;
    
    if (err.code === 'ECONNREFUSED') {
      errorMessage = 'Email service unavailable';
      statusCode = 503;
    } else if (err.code === 'EAUTH') {
      errorMessage = 'Email authentication failed';
    } else if (err.code === 'ETIMEDOUT') {
      errorMessage = 'Email service timeout';
      statusCode = 504;
    }
    
    return res.status(statusCode).json({
      ok: false,
      error: errorMessage
    });
  }
}