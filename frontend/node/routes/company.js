const express = require('express');
const axios = require('axios');
const app = express();

const API = 'http://localhost:8000/company';

// Create Company
app.post('/', async (req, res) => {
    try {
        const response = await axios.post(API + '/', req.body);
        res.json(response.data);
    } catch (Error) {
        res.status(500).json({ error: Error});
    }
});

module.exports = app;