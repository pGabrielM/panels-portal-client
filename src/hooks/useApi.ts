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
  storePanel: async (
    panel_name: string,
    panel_link: string,
    order: string,
    sector_id: number,
    category_id: number,
    subcategory_id: number,
    status: string
    ) => {
    const storageData = localStorage.getItem('authToken');

    const config = {
      headers: { 'Authorization': `Bearer ${storageData}` }
    };

    return await api.post('/panel', { panel_name, panel_link, order, sector_id, category_id, subcategory_id, status }, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      })
  },
  getOnePanel: async (panelId: Number) => {
    const storageData = localStorage.getItem('authToken');
    const config = {
      headers: { 'Authorization': `Bearer ${storageData}` }
    };

    const response = await api.get(`/panel/${panelId}`, config)
    return response.data;
  },
  getAllPanel: async () => {
    const storageData = localStorage.getItem('authToken');
    const config = {
      headers: { 'Authorization': `Bearer ${storageData}` }
    };

    const response = await api.get('/panel', config)
    return response.data;
  },
  updatePanel: async (panelId: number, panelDataToUpdate: Object) => {
    const storageData = localStorage.getItem('authToken');
    const config = {
      headers: { 'Authorization': `Bearer ${storageData}` }
    };

    const response = await api.patch(`/panel/${panelId}`, panelDataToUpdate, config)
    return response.data;
  },
  deletePanel: async (panelId: Number) => {
    const storageData = localStorage.getItem('authToken');
    const config = {
      headers: { 'Authorization': `Bearer ${storageData}` }
    };

    const response = await api.delete(`/panel/${panelId}`, config)
    return response.data;
  }
})