import axios from 'axios';
import qs from 'qs'

// const baseURL = 'http://121.89.244.79/exam-system/api'
const baseURL = ''

// 创建axios实例
const service = axios.create({
    baseURL: baseURL, // 域名配置，可添加变量配置文件定义
    withCredentials: true, // 跨域请求时是否需要使用凭证
    timeout: 30000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
    config => {
        // config.headers['Authorization'] = localStorage.getItem("token") || '';
        config.headers['authorization'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwb2xpY2UtdXNlciIsImlhdCI6MTc0MTg2MzI3NywiZXhwIjoxNzQxOTQ5Njc3LCJyb2xlSWQiOjMsInVzZXJuYW1lIjoid3p6IiwicGFzc3dvcmQiOiI5NDk5MjczMjIzYzdhY2E1OTQ5ZTMwNTVlYWE1N2Y2ZiJ9.W5ypzE9qCyRWEsMR4MpgcofcD0-j9pSM8cpPzYuHd-4';

        // post改变 Content-Type 的值 ， 序列化请求参数
        if (config.method?.toUpperCase() === 'POST') {

            config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
            config.data = qs.stringify(config.data)
        } else {
            config.headers['Content-Type'] = 'application/json;charset=UTF-8'
        }
        console.log(config,'---config');
        
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    (response) => {

        if (response.status === 200) {
            return response.data; 
        }else{
            if(response.data.statusCode === 401){
                uni.showToast({
                    title: '请重新登录',
                    icon: 'none',
                    duration: 2000,
                    success: () => {
                        setTimeout(() => {
                            uni.reLaunch({
                                url: '/pages/login/login'
                            });
                        }, 2000);
                    }
                });
            }else{
                uni.showToast({
                    title: '请求出错（'+response.data.statusCode+')',
                    icon: 'none',
                    duration: 2000
                });
            }
        }
    },
    (err) => {
        return Promise.reject(err.response);
    }
);

export default service;