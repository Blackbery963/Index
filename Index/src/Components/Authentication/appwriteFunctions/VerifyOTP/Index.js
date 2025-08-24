// import { Client, Databases, Query } from 'appwrite';

// export default async function (req, res) {
//   try {
//     // Parse request payload
//     const payload = JSON.parse(req.payload);
//     const phone = payload.phone;
//     const otp = payload.otp;

//     if (!phone || !otp) {
//       return res.json(
//         { success: false, message: 'Phone number and OTP are required' },
//         400
//       );
//     }

//     // Initialize Appwrite client
//     const client = new Client()
//       .setEndpoint(req.variables.APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
//       .setProject(req.variables.APPWRITE_PROJECT_ID)
//       .setKey(req.variables.APPWRITE_API_KEY);
//     const databases = new Databases(client);

//     // Query the latest OTP for the phone number
//     const result = await databases.listDocuments(
//       'auth_db', // Replace with your database ID
//       'otps', // Replace with your collection ID
//       [
//         Query.equal('phone', phone),
//         Query.orderDesc('createdAt'),
//         Query.limit(1),
//       ]
//     );

//     if (result.documents.length === 0) {
//       return res.json({ success: false, message: 'No OTP found for this phone' }, 404);
//     }

//     const storedOtp = result.documents[0];
//     const currentTime = Math.floor(Date.now() / 1000);
//     const otpAge = currentTime - storedOtp.createdAt;

//     // Check if OTP is expired (5 minutes = 300 seconds)
//     if (otpAge > 300) {
//       return res.json({ success: false, message: 'OTP has expired' }, 400);
//     }

//     // Verify OTP
//     if (storedOtp.otp !== otp) {
//       return res.json({ success: false, message: 'Invalid OTP' }, 400);
//     }

//     // Delete OTP after verification
//     await databases.deleteDocument('auth_db', 'otps', storedOtp.$id);

//     return res.json({ success: true, message: 'OTP verified successfully' });
//   } catch (error) {
//     console.error('Error in verifyOTP:', error);
//     return res.json(
//       { success: false, message: `Failed to verify OTP: ${error.message}` },
//       500
//     );
//   }
// };

const { Client, Databases, Query } = require('appwrite');

module.exports = async function (req, res) {
  try {
    // Parse request payload
    const payload = JSON.parse(req.payload);
    const email = payload.email; // Changed from phone to email
    const otp = payload.otp;

    if (!email || !otp) {
      return res.json(
        { success: false, message: 'Email and OTP are required' },
        400
      );
    }

    // Initialize Appwrite client
    const client = new Client()
      .setEndpoint(req.variables.APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
      .setProject(req.variables.APPWRITE_PROJECT_ID)
      .setKey(req.variables.APPWRITE_API_KEY);
    const databases = new Databases(client);

    // Query the latest OTP for the email
    const result = await databases.listDocuments(
      'auth_db',
      'otps',
      [
        Query.equal('email', email), // Changed from phone to email
        Query.orderDesc('createdAt'),
        Query.limit(1),
      ]
    );

    if (result.documents.length === 0) {
      return res.json({ success: false, message: 'No OTP found for this email' }, 404);
    }

    const storedOtp = result.documents[0];
    const currentTime = Math.floor(Date.now() / 1000);
    const otpAge = currentTime - storedOtp.createdAt;

    // Check if OTP is expired (5 minutes = 300 seconds)
    if (otpAge > 300) {
      return res.json({ success: false, message: 'OTP has expired' }, 400);
    }

    // Verify OTP
    if (storedOtp.otp !== otp) {
      return res.json({ success: false, message: 'Invalid OTP' }, 400);
    }

    // Delete OTP after verification
    await databases.deleteDocument('auth_db', 'otps', storedOtp.$id);

    return res.json({ success: true, message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Error in verifyOTP:', error);
    return res.json(
      { success: false, message: `Failed to verify OTP: ${error.message}` },
      500
    );
  }
};