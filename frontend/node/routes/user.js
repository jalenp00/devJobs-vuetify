const express = require('express');
const axios = require('axios');
const app = express();

// Calls backend service
const API = 'http://localhost:8000'

// Create User
app.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const response = await axios.post(API + '/user/', req.body);
    res.json(response.data);
    
  } catch (Error) {
    res.status(500).json({ error: Error });
  }
});

module.exports = app;