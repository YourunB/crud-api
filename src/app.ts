import dotenv from 'dotenv'
import express from 'express'

dotenv.config();

export const startServer = (port: number) => { 
  express().use(express.json());
  express().use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
  });
  express().listen(port, () => console.log(`Server is running on http://localhost:${port}`));
}
