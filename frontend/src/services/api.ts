import axios from 'axios';

const baseURL = process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8000/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;