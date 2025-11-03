/**
 * Axios封装
 */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Toast } from 'antd-mobile';

// 创建axios实例
const request: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8070',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 从localStorage获取token
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;
    
    // 如果返回的状态码不是200，则判断为错误
    if (res.code !== undefined && res.code !== 200 && res.code !== 0) {
      Toast.show({
        icon: 'fail',
        content: res.message || '请求失败',
      });
      return Promise.reject(new Error(res.message || '请求失败'));
    }
    
    return res;
  },
  (error) => {
    console.error('Response error:', error);
    
    let message = '网络错误';
    if (error.response) {
      switch (error.response.status) {
        case 401:
          message = '未授权，请重新登录';
          // 清除token并跳转到登录页
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }
          break;
        case 403:
          message = '拒绝访问';
          break;
        case 404:
          message = '请求地址不存在';
          break;
        case 500:
          message = '服务器错误';
          break;
        default:
          message = error.response.data?.message || '请求失败';
      }
    } else if (error.request) {
      message = '网络连接失败';
    }
    
    Toast.show({
      icon: 'fail',
      content: message,
    });
    
    return Promise.reject(error);
  }
);

export default request;

