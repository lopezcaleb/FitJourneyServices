import express from 'express';
import 'dotenv/config'

import { authRoutes } from './routes/routes';
import { connectToDatabase } from './config/db';

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

connectToDatabase();
authRoutes(app);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`); 
});