import axios from "axios";

const fileManager = axios.create({
    baseURL: process.env.VUE_APP_FILE_MANAGER
});

export default fileManager;