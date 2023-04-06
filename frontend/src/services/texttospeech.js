import axios from 'axios';

const instance = axios.create({
  baseURL:
    !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
      ? 'http://localhost:5000'
      : 'https://lexiaid.herokuapp.com',
  withCredentials: true,
});

export const synthesize_speech = request => {
  return instance.post('/texttospeech/synthesize_speech', request);
};
