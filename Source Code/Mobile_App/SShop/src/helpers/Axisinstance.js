import axios from "axios";
// import AsyncStorge from "@react-native-async-storage/async-storage";

const CustomAxios = (contentType = 'application/json') => {
    const axiosInstance = axios.create({
        baseURL: 'http://172.16.2.211:8080/'
    });

    axiosInstance.interceptors.request.use(
        async (config) => {
            // const token = await AsyncStorage.getItem('token');
            const token = '';   
            config.headers = {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': contentType,
            }
            return config;
        }, err => Promise.reject(err)
    );

    axiosInstance.interceptors.response.use(
        res => res.data,
        err => Promise.reject(err)
    );

    return axiosInstance;

};

export default CustomAxios;