const express = require('express');
const axios = require('axios');
const app = express();

// Backend api
const API = 'http://localhost:8000/user'

// Gets user
app.get('/', async (req, res) => {
  try {
    const id = req.query.id;
    const response = await axios.get(API + '/', {
      params: {
        id
      }
    });
    res.json(response.data);
  } catch (Error) {
    res.status(500).json({ error: Error })
  }
});

// Create User
app.post('/', async (req, res) => {
  try {
    const response = await axios.post(API + '/', req.body);
    res.json(response.data);
  } catch (Error) {
    res.status(500).json({ error: Error });
  }
});

// Login User
app.post('/login', async (req, res) => {
  try {
    const response = await axios.post(API + '/login', req.body);
    res.json(response.data);
  } catch (Error) {
    res.status(500).json({error: Error});
  }
});

module.exports = app;