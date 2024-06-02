import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

export const getUsers = async () => {
  const response = await api.get("users");
  return response.data;
};

export const getUser = async (userId) => {
  const response = await api.get(`users?id=${userId}`);
  return response.data[0];
};

export const getUserAlbums = async (userId) => {
  const response = await api.get(`albums?userId=${userId}`);
  return response.data;
};

export const getAllAlbums = async (userId) => {
  const response = await api.get(`albums`);
  return response.data;
};
