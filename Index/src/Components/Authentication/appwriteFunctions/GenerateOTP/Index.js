// import { Client, Databases, ID } from 'appwrite';
// import twilio from 'twilio';

// export default async function (req, res) {
//   try {
//     // Parse request payload
//     const payload = JSON.parse(req.payload);
//     const phone = payload.phone;

//     if (!phone) {
//       return res.json({ success: false, message: 'Phone number is required' }, 400);
//     }

//     // Initialize Appwrite client
//     const client = new Client()
//       .setEndpoint(req.variables.APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
//       .setProject(req.variables.APPWRITE_PROJECT_ID)
//       .setKey(req.variables.APPWRITE_API_KEY);
//     const databases = new Databases(client);

//     // Generate 6-digit OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const createdAt = Math.floor(Date.now() / 1000);

//     // Store OTP in database
//     await databases.createDocument(
//       'auth_db', // Replace with your database ID
//       'otps', // Replace with your collection ID
//       ID.unique(),
//       {
//         phone,
//         otp,
//         createdAt,
//       }
//     );

//     // Send OTP via Twilio
//     const twilioClient = twilio(
//       req.variables.TWILIO_ACCOUNT_SID,
//       req.variables.TWILIO_AUTH_TOKEN
//     );
//     await twilioClient.messages.create({
//       body: `Your OTP is ${otp}. It expires in 5 minutes.`,
//       from: req.variables.TWILIO_PHONE_NUMBER,
//       to: phone,
//     });

//     return res.json({ success: true, message: 'OTP sent successfully' });
//   } catch (error) {
//     console.error('Error in generateOTP:', error);
//     return res.json(
//       { success: false, message: `Failed to send OTP: ${error.message}` },
//       500
//     );
//   }
// };

import { Client, Databases, ID } from 'appwrite';
import { setApiKey, send } from '@sendgrid/mail'; // Optional: For email sending

export default async function (req, res) {
  try {
    // Parse request payload
    const payload = JSON.parse(req.payload);
    const email = payload.email; // Changed from phone to email

    if (!email) {
      return res.json({ success: false, message: 'Email is required' }, 400);
    }

    // Initialize Appwrite client
    const client = new Client()
      .setEndpoint(req.variables.APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
      .setProject(req.variables.APPWRITE_PROJECT_ID)
      .setKey(req.variables.APPWRITE_API_KEY);
    const databases = new Databases(client);

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const createdAt = Math.floor(Date.now() / 1000);

    // Store OTP in database
    await databases.createDocument(
      'auth_db', // Your database ID
      'otps', // Your collection ID
      ID.unique(),
      {
        email, // Changed from phone to email
        otp,
        createdAt,
      }
    );

    // Send OTP via SendGrid (or another email service)
    setApiKey(req.variables.SENDGRID_API_KEY);
    const msg = {
      to: email,
      from: req.variables.SENDGRID_FROM_EMAIL || 'no-reply@your-app.com',
      subject: 'Your OTP for Password Reset',
      text: `Your OTP is ${otp}. It expires in 5 minutes.`,
    };
    await send(msg);

    return res.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error in generateOTP:', error);
    return res.json(
      { success: false, message: `Failed to send OTP: ${error.message}` },
      500
    );
  }
};