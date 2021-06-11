import axios from 'axios';
import dotenv from 'dotenv'
dotenv.config()

const BASE_URL = 'https://api.airtable.com/v0/app21I9aDDq7taz3k/users';

const apiKey = process.env.AIRTABLE_API_KEY;
const config = {
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
};

export async function getAllUsers() {
  try {
    const res = await axios.get(BASE_URL, config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function createUser(user: { username: string; password: string }) {
  try {
    const res = await axios.post(BASE_URL, { fields: user }, config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}
