import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://openmind-api.vercel.app/18-1',
});

export default instance;
