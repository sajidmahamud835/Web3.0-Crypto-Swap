import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.mexc.com',
  headers: {
    'X-MEXC-APIKEY': process.env.MEXC_API_KEY,
  },
});

export default apiClient;
