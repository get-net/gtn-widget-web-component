import store from "@/store";
import axios from "axios";

const kyc = axios.create({
    baseURL: process.env.VUE_APP_KYC_API_V11,
});

kyc.interceptors.request.use(config => {
    const token = store.getters['agent/token'];
    config.headers.Authorization = token ? "" : `Bearer 183a707c3a8998087a78654f18d703928b82ebeea9642f32693d68f032d8e4bf`;
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
