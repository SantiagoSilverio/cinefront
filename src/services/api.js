import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'https://back-k1a3.onrender.com/',
});

api.interceptors.request.use((config) => {
  const token = Cookies.get('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = Cookies.get('refresh_token');
      if (refreshToken) {
        try {
          const response = await axios.post('https://back-k1a3.onrender.com/login/refresh', {
            refresh: refreshToken
          });
          Cookies.set('access_token', response.data.access);
          api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
          return api(originalRequest);
        } catch (refreshError) {
          Cookies.remove('access_token');
          Cookies.remove('refresh_token');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export const login = async (username, password) => {
  const response = await api.post('login', { username, password });
  Cookies.set('access_token', response.data.access);
  Cookies.set('refresh_token', response.data.refresh);
  return response.data;
};

export const logout = async () => {
  await api.post('logout/');
  Cookies.remove('access_token');
  Cookies.remove('refresh_token');
};

export const getUsers = async () => {
  const response = await api.get('users/');
  return response.data;
};

export const getUser = async (id) => {
  const response = await api.get(`users/${id}/`);
  return response.data;
};

export default api;