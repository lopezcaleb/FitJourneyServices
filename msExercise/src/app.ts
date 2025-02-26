import express, { Request, Response } from 'express';
import 'dotenv/config'
import { connectToDatabase } from './config/db';
import { routesV1 } from './routes/routes';

require('dotenv').config();

const app = express();
app.use(express.json());

connectToDatabase();

routesV1(app);

const port= process.env.env || 3003;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});