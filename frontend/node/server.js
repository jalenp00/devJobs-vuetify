//DEPRACATED: Use for reference only
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 3000;

// Import route modules
const userRoutes = require('./routes/user');
/*
const listingRoutes = require('./routes/listing');
const companyRoutes = require('./routes/company');
const companyUserRoutes = require('./routes/companyUser');
*/
// Middleware for JSON and CORS
app.use(express.json());

// Allow Vue.js frontend
app.use(cors({ origin: 'http://localhost:8080' })); 

app.use('/user', userRoutes);
/*
app.use('/listing', listingRoutes);
app.use('/company', companyRoutes);
app.use('/companyUser', companyUserRoutes);
*/
app.listen(port, () => {
  console.log(`Node.js server listening at http://localhost:${port}`);
});
