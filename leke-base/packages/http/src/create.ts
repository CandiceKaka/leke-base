import axios from 'axios';
import {httpInstance,createOption} from "./types";

function validateStatus(){
    return true;
}

export default function createHttp (opt?:createOption):httpInstance {
    const headers=Object.assign({'X-Requested-With':'XMLHttpRequest'},opt&&opt.headers);
    const option={
        ...opt,
        headers
    };
    const {requestInterceptor,responseInterceptor}=option;
    const http = axios.create(option);
    http.interceptors.request.use(function (config) {
        if(typeof window==='undefined'){
            config.validateStatus=validateStatus;
        }
        if(typeof requestInterceptor==='function'){
            return requestInterceptor(config);
        }
        return config;
    });
    http.interceptors.response.use((response) => {
        const result=response.data||{};
        if(typeof responseInterceptor==='function'){
            return requestInterceptor(response);
        }
        if(response.status===200&&result.success){
            return result.hasOwnProperty('data')?result.data:result.hasOwnProperty('datas')?result.datas:result;
        }
        return Promise.reject(response);
    }, err => {
        return Promise.reject(err);
    });
    return http;
};
