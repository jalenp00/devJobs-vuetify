const express = require('express');
const axios = require('axios');
const app = express();

// Backend api
const API = 'http://localhost:8000/user';

// Create User
app.post('/', async (req, res) => {
  try {
    const response = await axios.post(API + '/', req.body);
    res.json(response.data);
  } catch (Error) {
    res.status(500).json({ error: Error });
  }
});

// Gets user
app.get('/', async (req, res) => {
  try {
    const { id } = req.query;
    const response = await axios.get(API + '/', {
      params: {
        id: id
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: Error })
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