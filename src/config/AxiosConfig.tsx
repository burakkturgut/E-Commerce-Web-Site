//!  bu kodun amacı tüm http isteklerini tek bir yerden yönetmek ve bir baseUrl sayesinde tek bir kontrol mekanizması sağlar 

import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
});

export default axiosInstance;