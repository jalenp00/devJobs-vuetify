//DEPRACATED: Use for reference only
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 3000;

// Middleware for JSON and CORS
app.use(express.json());

// Allow Vue.js frontend
app.use(cors({ origin: 'http://localhost:8080' })); 

// Calls backend service
const API = 'http://localhost:8000'

// Route to proxy requests to FastAPI
app.post('/job/', async (req, res) => {
  try {
    console.log(req.body);
    const response = await axios.post(API + '/job/', req.body);
    res.json(response.data);
    
  } catch (Error) {
    res.status(500).json({ error: Error });
  }
});
app.listen(port, () => {
  console.log(`Node.js server listening at http://localhost:${port}`);
});
