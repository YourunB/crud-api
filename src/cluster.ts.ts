import app from './app';
import cluster from 'node:cluster';
import dotenv from 'dotenv';
import os from 'node:os';

dotenv.config();

const cpus = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`It works following way ${process.pid} start:`);
  for (let i = 0; i < cpus; i += 1) cluster.fork();
  cluster.on('exit', (worker) => console.log(`Process ${worker.process.pid} end`));
} else {
  const port = Number(process.env.PORT) + (cluster.worker?.id || 0);
  app.listen(port, () => console.log(`Worker ${process.pid} start: http://localhost:${port}/`));
}
