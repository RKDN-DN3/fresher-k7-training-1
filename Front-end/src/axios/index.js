import axios from 'axios';

const axiosClient = axios.create();

axiosClient.defaults.baseURL = 'https://todosample.azurewebsites.net';

axiosClient.defaults.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
};

axiosClient.interceptors.request.use(async (config) => config);

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }

        return response;
    },
    (error) => {
        throw error;
    },
);

export default axiosClient;
