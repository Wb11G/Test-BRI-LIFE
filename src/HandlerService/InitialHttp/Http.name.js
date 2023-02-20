import axios from 'axios';
import setHTTPHeader from './Http.Header';
const header = setHTTPHeader();


//Interceptors
const instance = axios.create({
    baseURL: process.env.REACT_APP_URL,
});

// Header
instance.defaults.headers.common['Authorization'] = header.Authorization;


// response middleware digunakan jika ada kebutuhan khusus
instance.interceptors.response.use(
    response => {
        // console.log(response)
        return response
    },
    error => {
        // console.log(error)
        return Promise.reject(error)
    })

export default instance;
