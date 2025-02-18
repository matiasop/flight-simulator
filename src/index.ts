import express, { Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import FlightRoutes from './routes/FlightRoutes';

dotenv.config();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || '3000', 10);
const MONGODB_URI: string = process.env.MONGODB_URI!;

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB', err));

app.use(express.json());
app.use('/flights', FlightRoutes);

app.listen(PORT, (): void => {
  console.log(`Server running at http://localhost:${PORT}`);
});
