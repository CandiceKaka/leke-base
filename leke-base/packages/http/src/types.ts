import {AxiosRequestConfig, AxiosResponse, AxiosInterceptorManager} from 'axios';

export type httpRequest=AxiosRequestConfig;

export interface createOption extends httpRequest{
    requestInterceptor?:(config:httpRequest)=>httpRequest,
    responseInterceptor?:<T=any>(res:AxiosResponse)=>T
}

export type httpPromise<T=any>=Promise<T>

export interface httpInstance {
    (config: httpRequest): httpPromise;
    (url: string, config?: AxiosRequestConfig): httpPromise;
    defaults: httpRequest;
    interceptors: {
        request: AxiosInterceptorManager<httpRequest>;
        response: AxiosInterceptorManager<httpRequest>;
    };
    getUri(config?: httpRequest): string;
    request<T = any> (config: httpRequest): Promise<T>;
    get<T = any>(url: string, config?: httpRequest): Promise<T>;
    delete<T = any>(url: string, config?: httpRequest): Promise<T>;
    head<T = any>(url: string, config?: httpRequest): Promise<T>;
    options<T = any>(url: string, config?: httpRequest): Promise<T>;
    post<T = any>(url: string, data?: any, config?: httpRequest): Promise<T>;
    put<T = any>(url: string, data?: any, config?: httpRequest): Promise<T>;
    patch<T = any>(url: string, data?: any, config?: httpRequest): Promise<T>;
}