const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios'); // Import axios
require('dotenv').config(); // Import and configure dotenv to load .env variables

const app = express();
const port = 3001;

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Enable parsing JSON request bodies

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// API endpoint to handle search queries
app.post('/api/search', async (req, res) => { // Make the handler async
  const { query } = req.body; // Get the query from the request body

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  // --- Hugging Face API Integration ---
  const hfApiToken = process.env.HF_API_TOKEN;
  const hfApiUrl = 'https://api-inference.huggingface.co/models/distilgpt2'; // distilgpt2 endpoint

  if (!hfApiToken) {
      console.warn("Hugging Face API token not found. Set HF_API_TOKEN in .env file. Calls might be rate-limited.");
      // Decide if you want to proceed without a token or return an error
      // return res.status(500).json({ error: 'Server configuration error: Missing Hugging Face API token' });
  }

  try {
    console.log(`Sending query to Hugging Face: "${query}"`);

    const response = await axios.post(
      hfApiUrl,
      {
        inputs: query, // Send the user query as input
        parameters: {
            max_new_tokens: 75, // Limit the response length
            return_full_text: false, // Only get the generated text
            // You can add other parameters like temperature, top_k, etc.
            // temperature: 0.7,
            // repetition_penalty: 1.2
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${hfApiToken}`, // Pass the API token
          'Content-Type': 'application/json',
        },
        timeout: 15000 // Add a timeout (e.g., 15 seconds)
      }
    );

    console.log("Hugging Face API Response Status:", response.status);
    // console.log("Hugging Face API Response Data:", JSON.stringify(response.data, null, 2)); // Log the full response for debugging if needed

    // Extract the generated text
    // The response is typically an array, e.g., [{ "generated_text": "..." }]
    if (response.data && Array.isArray(response.data) && response.data.length > 0 && response.data[0].generated_text) {
      const generatedText = response.data[0].generated_text.trim();
      console.log("Generated text:", generatedText);
      // Send the generated text back to the frontend
      res.json({ answer: generatedText });
    } else {
       // Handle cases where the structure might be different or empty
       console.error("Unexpected response structure from Hugging Face API:", response.data);
       res.status(500).json({ error: 'Received unexpected response format from HF API' });
    }

  } catch (error) {
    console.error('Error calling Hugging Face API:', error.response ? error.response.data : error.message); // Log detailed error
    // Provide more specific error feedback if possible
    let errorMessage = 'Failed to get response from Hugging Face API.';
    if (error.code === 'ECONNABORTED') {
        errorMessage = 'The request to Hugging Face timed out.';
    } else if (error.response) {
        // Include status code and potentially message from HF if available
        errorMessage += ` Status: ${error.response.status}. Message: ${JSON.stringify(error.response.data)}`;
        if (error.response.status === 401) {
            errorMessage = 'Authentication error with Hugging Face API. Check your API token.';
        } else if (error.response.status === 503) {
             errorMessage = 'The Hugging Face model is likely loading. Please try again in a moment.';
        }
    }
    res.status(500).json({ error: errorMessage });
  }
  // --- End Hugging Face API Integration ---
});

// Serve the main HTML file for the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
