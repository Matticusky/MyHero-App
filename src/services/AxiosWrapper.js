import axios from 'axios';
import AlertService from './AlertService';
import store from '../redux/Store';
import { resetAuth } from '../redux/Reducers/AuthReducer';
// Add request interceptor
// Add response interceptor
axios.interceptors.response.use(
    (response) => {
        const { config } = response;
        const { method } = config;
        return response;
    },
    (error) => {
        const { config } = error.response;
        const { method } = config;
        return Promise.reject(error);
    }
);
const axiosConfig = {
    headers: {
        'Content-Type': 'application/json'
    },
};
const axiosWrapper = async (method, url, data, token, isFormData = false, responseType = 'json', showToast = false) => {
     try {
        const config = {
            method,
            url,
            ...axiosConfig,
            responseType
        };
        if (token) config.headers['Authorization'] = `Bearer ${token}`;
        if (isFormData) {
            config.headers['Content-Type'] = 'multipart/form-data';
            config.data = data;
        } else {
            config.headers['Content-Type'] = 'application/json';
            if (data) config.data = data;
        }
        
        const response = await axios(config);
        
        if ((response?.data?.message || response?.message) && showToast) 
            {
                AlertService.toastPrompt(response.data.message || response.message)
            }
        return response.data ? response.data : response;
    } catch (error) {
        // let msg = error?.response?.data?.desc ? error?.response?.data?.desc : error?.response?.data?.error ? error?.response?.data?.error : error?.response?.data?.message ? error?.response?.data?.message
        //     : error?.response?.message ? error?.response?.message : error?.response?.desc ? error?.response?.desc :error?.message?error?.message: false;
        
        let msg=   error?.response?.data?.validation?.body?.message ||
            error?.response?.data?.desc ||
            error?.response?.data?.message ||
            error?.message;
            if (msg && showToast) 
            {
                AlertService.toastPrompt(msg, 'error')
            }
            if(msg === 'Unauthorized'){
                store.dispatch(resetAuth())
                AlertService.toastPrompt("You are not an authorized user", 'error')
            }
        return Promise.reject(msg);
    }
};
export default axiosWrapper;