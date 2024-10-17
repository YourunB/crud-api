import express from 'express'
import dotenv from 'dotenv'
import { userRouter } from './api/users'

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', userRouter);

app.listen(port, () => {
  console.log(`Server work: http://localhost:${port}`);
})
