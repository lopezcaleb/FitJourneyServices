import express from 'express';
import 'dotenv/config'

import { routesV1 } from './routes/routes';
import {connectToDatabase} from './config/db'
import { NotExistRootUserValidation } from './services/user.service';

const app = express();
app.use(express.json());

connectToDatabase();

routesV1(app);

NotExistRootUserValidation();

const port = process.env.PORT || 3001;
app.listen(port || 3001, () => {
  console.log(`Server is running on http://localhost:${port}`);
});