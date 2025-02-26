import express from 'express';
import 'dotenv/config'
import { routesV1 } from './routes/routes';
import { connectToDatabase } from './config/db';

const app = express();
app.use(express.json());

connectToDatabase();
routesV1(app);

const port = process.env.PORT || 3004;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});