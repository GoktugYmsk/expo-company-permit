import axios from 'axios';
const api = axios.create({
    baseURL: 'https://time-off-tracker-api-4a95404d0134.herokuapp.com/time-off/',
});

api.interceptors.request.use(
    async (config) => {
        const tokenLocale = localStorage.getItem('userToken')
        const token = { tokenLocale };
        if (token) {
            config.headers['Authorization'] = `Bearer ${tokenLocale}`;
        }

        config.headers[`Accept`] = "application/json"
        config.headers[`Content-Type`] = "application/json"

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;