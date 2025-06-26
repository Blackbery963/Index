import express from 'express';
import cors from 'cors';
import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';

// Load .env variables
dotenv.config();

console.log("✅ EMAIL loaded:", process.env.EMAIL);
console.log("✅ Password length:", process.env.EMAIL_PASSWORD?.length);

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // or your frontend URL
  credentials: true
}));
app.use(express.json()); // <-- use express.json instead of just json()

// Email endpoint
app.get('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const transporter = createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }

  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: `New Message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
    replyTo: email
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Message failed to send', error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));


// server.js


// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import sgMail from '@sendgrid/mail';

// dotenv.config();
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const app = express();
// app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
// app.use(express.json());

// app.post('/api/contact', async (req, res) => {
//   const { name, email, message } = req.body;

//   if (!name || !email || !message)
//     return res.status(400).json({ message: 'All fields are required' });

//   const msg = {
//     to: process.env.EMAIL,
//     from: process.env.EMAIL, // Verified sender
//     subject: `New Message from ${name}`,
//     text: `From: ${name} <${email}>\n\n${message}`,
//     replyTo: email,
//   };

//   try {
//     await sgMail.send(msg);
//     res.json({ success: true, message: 'Message sent successfully!' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: 'Failed to send email', error: err.message });
//   }
// });

// app.listen(process.env.PORT || 3000, () =>
//   console.log(`✅ Server running on port ${process.env.PORT || 3000}`)
// );

