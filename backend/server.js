require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const { simulateAnswerGeneration } = require('./utils/simulateApi');

const app = express();
const PORT = process.env.PORT || 3001; // Use port from env or default to 3001

// === Middleware ===
// Enable CORS for requests from your frontend origin
// In production, restrict this to your actual frontend domain
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000' // Allow frontend access
}));

// Middleware to parse JSON request bodies (though not strictly needed for this GET request)
app.use(express.json());

// === Routes ===

// Simple root route for testing server status
app.get('/', (req, res) => {
  res.send('Search Engine Backend is running!');
});

// The main search API endpoint
app.get('/api/search', async (req, res) => {
  const query = req.query.q; // Get the search query from query parameters (?q=...)

  if (!query) {
    return res.status(400).json({ error: 'Query parameter "q" is required.' });
  }

  console.log(`Received search query: "${query}"`);

  try {
    // ** THIS IS WHERE THE MAGIC HAPPENS **
    // In a real app: Call functions to scrape/search APIs, then process with LLM.
    // For now: We call our simulation function.
    const result = await simulateAnswerGeneration(query);

    console.log('Sending simulated result:', result);
    res.json(result); // Send the structured result back to the frontend

  } catch (error) {
    console.error('Error processing search query:', error);
    // In a real app, provide more specific error handling
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

// === Start Server ===
app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
  console.log(`Allowing requests from: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
});
