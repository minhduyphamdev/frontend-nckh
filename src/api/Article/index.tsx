import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api/v1';

const token = localStorage.getItem('accessToken');

const handleError = (error: any) => {
  const { response, message } = error;
  if (response) {
    return response;
  }
  return message;
};

export const getArticles = async () => {
  try {
    const query = `${BASE_URL}/articles/fetch?pageOffset=1&limitSize=10`;
    const res = await axios.get(query);

    return res;
  } catch (error) {
    return handleError(error);
  }
};

export const getArticlesOfLecturers = async (data: any) => {
  try {
    const query = `${BASE_URL}/articles/fetch-all`;
    const res = await axios.post(query, data);

    return res;
  } catch (error) {
    return handleError(error);
  }
};

export const getDetailArticle = async (id: any) => {
  try {
    const query = `${BASE_URL}/articles/detail/${id}`;
    const res = await axios.get(query);

    return res;
  } catch (error) {
    return handleError(error);
  }
};

export const createArticle = async (data: any) => {
  try {
    const query = `${BASE_URL}/articles/create`;
    const res = await axios.post(query, data);

    return res;
  } catch (error) {
    return handleError(error);
  }
};

export const deleteArticle = async (data: any) => {
  try {
    const query = `${BASE_URL}/articles/delete`;
    const res = await axios.delete(query, data);

    return res;
  } catch (error) {
    return handleError(error);
  }
};