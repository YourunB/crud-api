import express from 'express';
import dotenv from 'dotenv';
import { userRouter } from './api/users';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api', userRouter);

export default app;
