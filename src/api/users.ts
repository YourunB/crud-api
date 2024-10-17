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

router.get('/users/', (req: Request, res: Response) => {
  res.status(200).json(users);
});

router.get('/users/:userId', (req: any, res: any) => {
  const { userId } = req.params;
  if (!uuidRegex.test(userId)) return res.status(400).json({ message: 'not uuid' });

  const foundUser = users.find(user => user.id === userId);
  if (!foundUser) return res.status(404).json({ message: `doesn't exist` })

  res.status(200).json(foundUser);
});

router.put('/users/:userId', (req: any,res: any) => {
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

router.post('/users/', (req: any, res: any) => {
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

router.delete('/users/:userId', (req: any, res: any) => {
  const { userId } = req.params;
  if (!uuidRegex.test(userId)) return res.status(400).json({ message: 'not uuid' });

  const i = users.findIndex(user => user.id === userId);
  if (i === -1) return res.status(404).json({ message: `doesn't exist` })

  users.splice(i, 1);
  res.status(204).send();
});


export const userRouter = router;
