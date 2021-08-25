import { NextFunction, Request, Response } from 'express';
import { getAllUsers } from '../services/api'

export async function isUsernameTaken(req: Request, res: Response, next: NextFunction) {
  const { username } = req.body;
  const { records: entries } = await getAllUsers();
  const taken = entries.some((entry: Entry) => entry.fields.username === username);
  if (taken) return res.status(409).send('Username taken');
  next();
}