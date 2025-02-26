import express from 'express';
import 'dotenv/config';

import { connectToDatabase } from './config/db';
import { routesV1 } from './routes/routes';

require('dotenv').config()

const app = express();

app.use(express.json());

routesV1(app);

connectToDatabase();

const port = process.env.PORT || 6;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});