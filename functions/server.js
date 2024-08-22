const express = require('express');
const serverless = require('serverless-http');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to serve the API key
app.get('/api/key', (req, res) => {
  res.json({ apiKey: process.env.API_KEY });
});

// Serve index.html for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Export the handler for Netlify
module.exports.handler = serverless(app);


