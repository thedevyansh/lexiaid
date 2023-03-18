import axios from 'axios';

const instance = axios.create({
  baseURL:
    !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
      ? 'http://localhost:5000'
      : 'https://lexiaid.herokuapp.com',
  withCredentials: true,
});

export const get_ttf = () => {
  return instance.get('/service/get_ttf');
};

export const generate_ttf = request => {
  return instance.post('/service/generate_ttf', request);
};
