import store from "@/store";
import axios from "axios";

const fileManagerApi = axios.create({
    baseURL: process.env.VUE_APP_FILE_MANAGER_API
});

fileManagerApi.interceptors.request.use(config => {
    const token = store.getters['token'];
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config
})

fileManagerApi.interceptors.response.use(
    response => {
        return response;
    },
    e => {
        return Promise.reject(e);
    }
)

export default fileManagerApi;