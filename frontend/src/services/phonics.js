import axios from 'axios';

const instance = axios.create({
  baseURL:
    !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
      ? 'http://localhost:5000'
      : 'https://lexiaid.herokuapp.com',
  withCredentials: true,
});

export const getModuleDetails = request => {
  return instance.get('/phonics/get_module', {params:request});
};
export const getChapters = request => {
  return instance.get('/phonics/get_chapters');
};
