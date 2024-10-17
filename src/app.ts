import dotenv from 'dotenv'
import express from 'express'
import { userRouter } from './routes';

dotenv.config();

export const startServer = (port: number) => {
  const app = express();

  app.use(express.json());
  app.use('/routes', userRouter);

  express().use(express.json());
  express().use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
  });
  express().listen(port, () => console.log(`Server work: http://localhost:${port}`));
}
