import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { createUser } from './services/api';
import { isUsernameTaken } from './middleware/middleware'
import { findUser } from './utils/helpers'

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
  } catch (err: any) {
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
  } catch (err: any) {
    res.status(401).send(err.message);
  }
});

app.listen(PORT, () => console.log('Server running'));


