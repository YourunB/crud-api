import express from 'express';

const router = express.Router();

interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

let users: User[] = [];

router.get('/', (req, res) => {
  res.status(200).json(users);
});

router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  const foundUser = users.find(user => user.id === userId);
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  if (uuidRegex) return res.status(400).json({ message: 'not uuid' });
  if (!foundUser) return res.status(404).json({ message: `doesn't exist` });

  res.status(200).json(foundUser);
});

export const userRouter = router;
