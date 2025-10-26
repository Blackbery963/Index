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
