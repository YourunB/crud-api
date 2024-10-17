import { startServer } from './app'

const PORT = process.env.PORT || 3000;
if (Number(PORT)) startServer(Number(PORT))
