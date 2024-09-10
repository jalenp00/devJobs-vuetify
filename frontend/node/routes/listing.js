import express from 'express';
import axios from 'axios';
const app = express();

// Backend api
const API = 'http://localhost:8000/listing';

// Create Listing
app.post('/', async (req, res) => {
  try {
    const response = await axios.post(API + '/', req.body);
    res.json(response.data);
  } catch (Error) {
    res.status(500).json({ error: Error });
  }
});

app.get('/companyId', async (req, res) => {
  try {
    const { id } = req.query;
    const response = await axios.get(API + '/companyId', {
      params: {
        id: id
      }
    });
    res.json(response.data);
  } catch (Error) {
    res.status(500).json({ error: Error});
  }
});

export default app;