import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
    const adminInfo = localStorage.getItem('adminInfo');
    if (adminInfo) {
        const { token } = JSON.parse(adminInfo);
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
