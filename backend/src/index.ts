import express from 'express';
import dotenv from 'dotenv';
import { setupAuth } from './auth/auth';
import profileRouter from './routes/profile';

dotenv.config();
const app = express();

app.use(express.json());
setupAuth(app);

app.use('/api/profile', profileRouter);

app.listen(3001, () => console.log('Backend listening on port 3001'));
