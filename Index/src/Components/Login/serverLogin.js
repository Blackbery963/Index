// const express = require('express');
import express from 'express'
const { Client, Account } = require('node-appwrite');
const cors = require('cors'); // For CORS support

// Initialize Express app
const app = express();
app.use(cors()); // Allow frontend to access the API
app.use(express.json()); // Parse JSON requests

// Initialize Appwrite client
const client = new Client()
    .setEndpoint(VITE_APPWRITE_ENDPOINT) // Your Appwrite endpoint
    .setProject(VITE_APPWRITE_PROJECT_ID) // Your Appwrite project ID
    .setKey(VITE_APPWRITE_API_KEY); // API key from Appwrite dashboard (server-side only)

const account = new Account(client);

// Login endpoint
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const session = await account.createEmailPasswordSession(email, password);
        res.json({ success: true, session });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});