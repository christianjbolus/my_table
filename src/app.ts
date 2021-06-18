import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { getAllUsers, createUser } from './api';

// CUSTOM TYPE
type Record = {
  fields: {
    username: string;
  };
};

const PORT = process.env.PORT || 8080;

const app: Application = express();

app.use(cors());
app.use(express.json());

app.post('/register', isUsernameTaken, async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const newUser = await createUser({ username, password: hash });
    res.send(newUser.id);
  } catch (err) {
    res.status(409).send(err.message);
  }
});

app.post('/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await findUser(username);
    const isValidPassword = await bcrypt.compare(password, user.fields.password);
    if (!isValidPassword) throw new Error('Username or password is incorrect');
    res.send(user.id);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

app.listen(PORT, () => console.log('Server running'));

async function findUser(username: string) {
  const { records } = await getAllUsers();
  const foundUser = records.find((record: Record) => record.fields.username === username);
  if (foundUser) {
    return foundUser;
  } else {
    throw new Error('Username or password is incorrect');
  }
}

// REGISTER MIDDLEWARE
async function isUsernameTaken(req: Request, res: Response, next: NextFunction) {
  const { username } = req.body;
  const { records } = await getAllUsers();
  const taken = records.some((record: Record) => record.fields.username === username);
  if (taken) return res.status(409).send('Username taken');
  next();
}
