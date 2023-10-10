import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://192.168.149.1:8080',
});
axiosClient.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

export default axiosClient;
