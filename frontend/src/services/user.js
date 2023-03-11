import axios from 'axios';

const instance = axios.create({
  baseURL:
    !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
      ? 'http://localhost:5000'
      : 'https://lexiaid.herokuapp.com',
  withCredentials: true,
});

export const auth = () => {
  return instance.get('/auth');
};

export const login = request => {
  return instance.post('/auth/login', request);
};

export const register = request => {
  return instance.post('/auth/register', request);
};

export const logout = () => {
  return instance.post('/auth/logout');
};
