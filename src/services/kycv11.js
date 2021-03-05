import store from "@/store";
import axios from "axios";

const kyc = axios.create({
    baseURL: process.env.VUE_APP_KYC_API_V11,
});

kyc.interceptors.request.use(config => {
    const token = store.getters['token'];
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
});

kyc.interceptors.response.use(
    response => {
        return response;
    },
    e => {
        return Promise.reject(e);
    }
);

export default kyc;
