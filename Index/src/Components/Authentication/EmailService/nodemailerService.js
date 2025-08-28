import express from 'express'
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { to, code, username } = req.body;

    // Create transporter
    // const transporter = nodemailer.createTransport ({
    //   service: 'gmail',
    //   auth: {
    //     user: process.env.EMAIL,
    //     pass: process.env.EMAIL_PASSWORD,
    //   },
    // });
  const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});


    // Send mail
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: to,
      subject: 'Verify Your Email for Painters Diary',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { 
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
              line-height: 1.6; 
              color: #333; 
              margin: 0; 
              padding: 0; 
              background-color: #f9f9f9;
            }
            .container { 
              max-width: 600px; 
              margin: 0 auto; 
              background-color: #ffffff;
              border-radius: 10px;
              overflow: hidden;
              box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            }
            .header { 
              background: linear-gradient(135deg, #1f7d53 0%, #145c3e 100%); 
              color: white; 
              padding: 25px; 
              text-align: center; 
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
              font-weight: 700;
            }
            .content { 
              padding: 30px; 
            }
            .code-container {
              text-align: center;
              margin: 25px 0;
            }
            .code { 
              font-size: 32px; 
              font-weight: bold; 
              color: #1f7d53; 
              display: inline-block;
              padding: 15px 25px;
              background: #e8f5e9; 
              border-radius: 8px;
              letter-spacing: 5px;
              border: 2px dashed #1f7d53;
            }
            .footer { 
              text-align: center; 
              margin-top: 30px; 
              font-size: 12px; 
              color: #777; 
              padding: 20px;
              background-color: #f5f5f5;
            }
            .button {
              display: inline-block;
              padding: 12px 24px;
              background-color: #1f7d53;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              font-weight: 600;
              margin-top: 20px;
            }
            .note {
              background-color: #fff8e1;
              padding: 15px;
              border-left: 4px solid #ffc107;
              margin: 20px 0;
              border-radius: 4px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Painters' Diary</h1>
            </div>
            <div class="content">
              <h2>Email Verification</h2>
              <p>Hello ${username},</p>
              <p>Thank you for registering with Painters' Diary. Please use the following verification code to complete your registration:</p>
              
              <div class="code-container">
                <div class="code">${code}</div>
              </div>
              
              <div class="note">
                <p><strong>Note:</strong> This code will expire in 10 minutes for security reasons.</p>
              </div>
              
              <p>If you didn't create an account with us, please ignore this email.</p>
              
              <div style="text-align: center;">
                <a href="https://thepaintersdiary.com/Authentication/Verification/EmailVerification" class="button">Verify Email</a>
              </div>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Painters' Diary. All rights reserved.</p>
              <p>If you need assistance, please contact support@paintersdiary.com</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ error: error.message });
  }
}