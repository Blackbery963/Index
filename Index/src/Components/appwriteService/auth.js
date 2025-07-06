const express = require('express');
const { Client, Users, ID } = require('node-appwrite');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173'], // Replace with your frontend URL
  credentials: true,
}));

// Rate limiting to prevent abuse
const signupLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 signup requests per window
  message: 'Too many signup attempts from this IP, please try again after 15 minutes.',
});

// Initialize Appwrite Client
const client = new Client()
  .setEndpoint(process.env.VITE_APPWRITE_ENDPOINT) // e.g., 'https://cloud.appwrite.io/v1'
  .setProject(process.env.VITE_APPWRITE_PROJECT_ID)
  .setKey(process.env.VITE_APPWRITE_API_KEY); // API key for server-side access

const users = new Users(client);

// Signup endpoint
app.post('/api/signup', signupLimiter, async (req, res) => {
  const { email, password, name, phone } = req.body;

  // Custom validation
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Email, password, and name are required' });
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  // Password strength validation (minimum 8 characters, at least one letter and one number)
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error: 'Password must be at least 8 characters long and contain at least one letter and one number',
    });
  }

  // Phone number validation (if provided)
  if (phone && !/^[\d\s+-]{10,15}$/.test(phone)) {
    return res.status(400).json({ error: 'Invalid phone number format' });
  }

  try {
    // Create a new user
    const user = await users.create(
      ID.unique(), // Unique user ID
      email,
      password,
      name
    );

    // Optionally store additional user data (e.g., phone number) in a database collection
    // For now, we'll log it
    console.log('User created:', { userId: user.$id, email, name, phone });

    // Create a session for immediate login
    const session = await users.createSession(user.$id);

    // Return the user data and session token
    res.status(201).json({
      message: 'Account created successfully',
      user: {
        id: user.$id,
        email: user.email,
        name: user.name,
      },
      sessionToken: session.$id, // Session token for client-side login
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(error.code || 500).json({
      error:
        error.code === 409
          ? 'Email already exists'
          : error.code === 429
          ? 'Too many requests. Please try again later.'
          : `Failed to create account: ${error.message}`,
    });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});