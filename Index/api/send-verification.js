// import nodemailer from "nodemailer";

// let transporter;
// const rateLimit = new Map();
// const RATE_LIMIT_WINDOW = 60000;
// const MAX_REQUESTS = 5;

// function getTransporter() {
//   if (!transporter) {
//     // Validate environment variables first
//     const requiredEnvVars = ['EMAIL_HOST', 'EMAIL_PORT', 'EMAIL_USER', 'EMAIL_PASS', 'APP_NAME'];
//     const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
//     if (missingEnvVars.length > 0) {
//       throw new Error(`Missing environment variables: ${missingEnvVars.join(', ')}`);
//     }

//     transporter = nodemailer.createTransport({
//       host: process.env.EMAIL_HOST,
//       port: Number(process.env.EMAIL_PORT),
//       secure: process.env.EMAIL_SECURE === "true",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//       // Additional options for better delivery
//       tls: {
//         rejectUnauthorized: false // Might help with self-signed certificates
//       },
//       connectionTimeout: 20000,
//       greetingTimeout: 20000
//     });
//   }
//   return transporter;
// }

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ ok: false, error: "Method not allowed" });
//   }

//   try {
//     const { to, code, username } = req.body;

//     // Validate input
//     if (!to || !code || !username) {
//       return res.status(400).json({ ok: false, error: "Missing required fields" });
//     }

//     // Validate email format
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(to)) {
//       return res.status(400).json({ ok: false, error: "Invalid email format" });
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
    
//     rateLimit.get(to).push(now);
//     // Clean up old entries periodically
//     if (Math.random() < 0.1) { // 10% chance to clean up
//       for (const [email, times] of rateLimit.entries()) {
//         rateLimit.set(email, times.filter(time => now - time < RATE_LIMIT_WINDOW * 10));
//       }
//     }

//     // Verify SMTP connection
//     try {
//       await getTransporter().verify();
//     } catch (verifyError) {
//       console.error("❌ SMTP connection failed:", verifyError);
//       return res.status(500).json({
//         ok: false,
//         error: "Email service temporarily unavailable"
//       });
//     }

//     const mailOptions = {
//       from: `"${process.env.APP_NAME}" <${process.env.EMAIL_USER}>`,
//       to,
//       subject: `Verify your email - ${process.env.APP_NAME}`,
//       text: `Hi ${username},\n\nYour verification code is: ${code}\n\nThis code will expire in 10 minutes.`,
//       html: `
//         <div style="font-family: Arial, sans-serif; padding:20px; color:#333;">
//           <h2>Welcome to ${process.env.APP_NAME} 🎨</h2>
//           <p>Hi <b>${username}</b>,</p>
//           <p>Thank you for signing up! Use the code below to verify your email:</p>
//           <div style="margin:20px 0; padding:10px; background:#f4f4f4; display:inline-block; font-size:20px; font-weight:bold; border-radius:6px;">
//             ${code}
//           </div>
//           <p>This code will expire in <b>10 minutes</b>.</p>
//           <p>If you didn't request this, please ignore this email.</p>
//           <br/>
//           <p style="font-size:12px; color:#888;">© ${new Date().getFullYear()} ${process.env.APP_NAME}</p>
//         </div>
//       `,
//       // Add headers to improve deliverability
//       headers: {
//         'X-Priority': '3',
//         'X-Mailer': 'Node.js',
//         'List-Unsubscribe': `<mailto:${process.env.EMAIL_USER}?subject=Unsubscribe>`
//       }
//     };

//     const info = await getTransporter().sendMail(mailOptions);

//     console.log("✅ Email sent to:", to, "Message ID:", info.messageId);

//     return res.status(200).json({ ok: true, id: info.messageId });
//   } catch (err) {
//     console.error("❌ Error sending email to:", req.body.to, "Error:", err);

//     return res.status(500).json({
//       ok: false,
//       error: process.env.NODE_ENV === "development" ? err.message : "Failed to send verification email"
//     });
//   }
// }




import nodemailer from "nodemailer";

let transporter;
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 60000;
const MAX_REQUESTS = 5;

// Initialize transporter once at module load
function initializeTransporter() {
  if (!transporter) {
    // Validate environment variables first
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
    
    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_SECURE === "false",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      logger: true,  // enable logging
      debug: true,   // show connection details
      // Better connection settings
      pool: true, // Use connection pooling
      maxConnections: 5,
      maxMessages: 100,
      connectionTimeout: 100000, // 30 seconds
      greetingTimeout: 30000,
      socketTimeout: 30000,
      // Retry mechanism
      retries: 3,
      // TLS options
      tls: {
        rejectUnauthorized: false // Helps with self-signed certificates
      }
    });

    // Verify connection once on startup
    transporter.verify()
      .then(() => console.log("✅ SMTP connection verified"))
      .catch(err => {
        console.error("❌ SMTP connection failed:", err.message);
        console.error("Please check your SMTP settings in environment variables");
      });
  }
  return transporter;
}

// Initialize immediately
initializeTransporter();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const { to, code, username } = req.body;

    // Validate input
    if (!to || !code || !username) {
      return res.status(400).json({ ok: false, error: "Missing required fields" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return res.status(400).json({ ok: false, error: "Invalid email format" });
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
    
    rateLimit.get(to).push(now);
    
    // Clean up old entries periodically
    if (Math.random() < 0.1) {
      for (const [email, times] of rateLimit.entries()) {
        rateLimit.set(email, times.filter(time => now - time < RATE_LIMIT_WINDOW * 10));
      }
    }

    const mailOptions = {
      from: `"${process.env.APP_NAME}" <${process.env.EMAIL_USER}>`,
      to,
      subject: `Verify your email - ${process.env.APP_NAME}`,
      text: `Hi ${username},\n\nYour verification code is: ${code}\n\nThis code will expire in 10 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; padding:20px; color:#333;">
          <h2>Welcome to ${process.env.APP_NAME} 🎨</h2>
          <p>Hi <b>${username}</b>,</p>
          <p>Thank you for signing up! Use the code below to verify your email:</p>
          <div style="margin:20px 0; padding:10px; background:#f4f4f4; display:inline-block; font-size:20px; font-weight:bold; border-radius:6px;">
            ${code}
          </div>
          <p>This code will expire in <b>10 minutes</b>.</p>
          <p>If you didn't request this, please ignore this email.</p>
          <br/>
          <p style="font-size:12px; color:#888;">© ${new Date().getFullYear()} ${process.env.APP_NAME}</p>
        </div>
      `,
      headers: {
        'X-Priority': '3',
        'X-Mailer': 'Node.js',
        'List-Unsubscribe': `<mailto:${process.env.EMAIL_USER}?subject=Unsubscribe>`
      }
    };

    const info = await getTransporter().sendMail(mailOptions);
    console.log("✅ Email sent to:", to, "Message ID:", info.messageId);

    return res.status(200).json({ ok: true, id: info.messageId });
    
  } catch (err) {
    console.error("❌ Error sending email:", err.message);
    
    // Specific error handling
    let errorMessage = "Failed to send verification email";
    let statusCode = 500;
    
    if (err.code === "ECONNREFUSED") {
      errorMessage = "Email service unavailable. Please try again later.";
      statusCode = 503; // Service Unavailable
    } else if (err.responseCode === 535) {
      errorMessage = "Email authentication failed. Please check server configuration.";
    } else if (err.code === "ETIMEDOUT") {
      errorMessage = "Email service timeout. Please try again.";
      statusCode = 504; // Gateway Timeout
    }
    
    return res.status(statusCode).json({
      ok: false,
      error: process.env.NODE_ENV === "development" ? err.message : errorMessage
    });
  }
}

function getTransporter() {
  if (!transporter) {
    throw new Error("SMTP transporter not initialized. Check environment variables.");
  }
  return transporter;
}