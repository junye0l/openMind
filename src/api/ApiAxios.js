import axios from 'axios';

const BASE_URL = 'https://openmind-api.vercel.app';
const TEAM = '18-1';

const instance = axios.create({
  baseURL: `${BASE_URL}/${TEAM}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
