import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

let users: User[] = [];

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

router.get('/', (req: Request, res: Response) => {
  res.status(200).json(users);
});

router.get('/:userId', (req: any, res: any) => {
  const { userId } = req.params;
  const foundUser = users.find(user => user.id === userId);

  if (uuidRegex) return res.status(400).json({ message: 'not uuid' });
  if (!foundUser) return res.status(404).json({ message: `doesn't exist` });

  res.status(200).json(foundUser);
});

router.put('/:userId', (req: any,res: any) => {
  const {
    userId
  } = req.params;
  const i = users.findIndex(user => user.id === userId);

  if (!uuidRegex.test(userId)) return res.status(400).json({ message: 'not uuid' });
  if (i === -1) return res.status(404).json({ message: `doesn't exist` });

  const { username, age, hobbies } = req.body;
  users[i] = {
    ...users[i],
    ...(username !== undefined && { username }),
    ...(age !== undefined && { age }),
    ...(hobbies !== undefined && { hobbies }),
  };

  res.status(200).json(users[i]);
});

router.post('/users', (req: any, res: any) => {
  const {
    username,
    age,
    hobbies
  } = req.body;

  if (!age || !username || !Array.isArray(hobbies)) return res.status(400).json({ message: 'body does not contain required fields' });

  const newUser: User = {
    id: uuidv4(),
    username,
    age,
    hobbies,
  };

  users.push(newUser);
  res.status(201).json(newUser);
})

export const userRouter = router;
