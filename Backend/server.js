// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors()); // Enable CORS for all routes

// Proxy endpoint to fetch cryptocurrency data with a dynamic limit
app.get('/api/crypto-list', async (req, res) => {
  const limit = req.query.limit || 10; // Default to 10 if no limit is provided

  try {
    const response = await axios.get(`https://api.alternative.me/v2/ticker/?limit=${limit}`);
    res.json(response.data); // Send the data back to the client
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cryptocurrency data' });
  }
});


// Proxy endpoint to fetch cryptocurrency details by id
app.get('/api/crypto-details/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`https://api.alternative.me/v2/ticker/${id}/`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch details' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
