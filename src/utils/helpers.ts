import { getAllUsers } from '../services/api'

export const findUser = async(username: string): Promise<Entry> => {
  const { records: entries } = await getAllUsers();
  const foundUser = entries.find((entry: Entry) => entry.fields.username === username);
  if (foundUser) {
    return foundUser;
  } else {
    throw new Error('Username or password is incorrect');
  }
}