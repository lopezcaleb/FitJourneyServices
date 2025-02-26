import express, {json} from 'express';
import 'dotenv/config';
import { connectToDatabase } from './config/db';
import { routesV1 } from './routes/routes';

const app = express();
app.use(json());
connectToDatabase();

routesV1(app);

const port = process.env.PORT || 3005;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});