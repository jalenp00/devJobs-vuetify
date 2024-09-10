//DEPRACATED: Use for reference only
import express, { json } from 'express';
import cors from 'cors';
const app = express();
const port = 3000;

// Import route modules
import userRoutes from './routes/user.js';
import companyRoutes from './routes/company.js';
import companyUserRoutes from './routes/companyUser.js';
import listingRoutes from './routes/listing.js';

// Middleware for JSON and CORS
app.use(json());

// Allow Vue.js frontend
app.use(cors({ origin: 'http://localhost:8080' })); 

app.use('/user', userRoutes);
app.use('/company', companyRoutes);
app.use('/companyuser', companyUserRoutes);
app.use('/listing', listingRoutes);

app.listen(port, () => {
  console.log(`Node.js server listening at http://localhost:${port}`);
});
