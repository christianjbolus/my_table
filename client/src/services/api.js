import axios from 'axios';

const apiKey = process.env.REACT_APP_AIRTABLE_KEY;

const URL = {
  RECIPE: 'https://api.airtable.com/v0/app21I9aDDq7taz3k/recipes',
  USER: 'https://api.airtable.com/v0/app21I9aDDq7taz3k/users',
  AUTH: 'https://my-table-server.herokuapp.com',
  // AUTH: 'http://localhost:8080',
};

const config = {
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
};

export const getAllRecipes = async () => {
  try {
    const res = await axios.get(URL.RECIPE, config);
    return res.data.records;
  } catch (err) {
    console.log(err);
  }
};

export const getOneRecipe = async id => {
  try {
    const res = await axios.get(`${URL.RECIPE}/${id}`, config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const createRecipe = async data => {
  try {
    const res = await axios.post(URL.RECIPE, { fields: data }, config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateRecipe = async (id, data) => {
  try {
    const res = await axios.put(`${URL.RECIPE}/${id}`, { fields: data }, config);
    return res.data.records;
  } catch (err) {
    console.log(err);
  }
};

export const deleteRecipe = async (id) => {
  try {
    const res = await axios.delete(`${URL.RECIPE}/${id}`, config);
    return res.data.records;
  } catch (err) {
    console.log(err);
  }
}

export const getUser = async id => {
  try {
    const res = await axios.get(`${URL.USER}/${id}`, config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const createUser = async user => {
  try {
    const res = await axios.post(`${URL.AUTH}/register`, user);
    console.log(res.data)
    return res.data;
  } catch (err) {
    return {error: err.response.data};
  }
};

export const loginUser = async user => {
  try {
    const res = await axios.post(`${URL.AUTH}/login`, user);
    return res.data;
  } catch (err) {
    return {error: err.response.data};
  }
};


