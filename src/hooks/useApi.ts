import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3003'
})

export const useApi = () => ({
  validateToken: async (token: string) => {
    const config = {
      headers: { 'Authorization': `Bearer ${token}` }
    };

    const response = await api.get('/profile', config);
    return response.data
  },
  login: async (email: string, password: string) => {
    return await api.post('/login', { email, password })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      })
  },
  logout: async () => {
    const response = await api.get('/logout')
    return response.data;
  },
  panel: async (panelName: string, panelLink: string) => {
    const storageData = localStorage.getItem('authToken');

    const config = {
      headers: { 'Authorization': `Bearer ${storageData}` }
    };
    
    return await api.post('/panel', { panelName, panelLink }, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      })
  },
  getAllPanel: async () => {
    const storageData = localStorage.getItem('authToken');

    const config = {
      headers: { 'Authorization': `Bearer ${storageData}` }
    };

    const response = await api.get('/panel', config)
    return response.data;
  },
})