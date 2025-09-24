import { getCookie, getPairTokens, removePairTokens, setCookie } from '@/libs/token';
import { notification } from 'antd';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

let baseURL = 'http://pan-home.trueddns.com:30746';

if (process.env.NODE_ENV === 'production') {
  baseURL = process.env.NEXT_PUBLIC_BASEURL_API_PROD || baseURL;
} else if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  baseURL = process.env.NEXT_PUBLIC_BASEURL_API_DEV || baseURL;
}

const api = axios.create({
  baseURL: `${baseURL}/api/`,
});

api.interceptors.request.use(
  async (config) => {
    const { accessToken } = getPairTokens();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  async (error: AxiosError) => {
    notification.error({
      placement: 'topRight',
      message:
        (error.response?.data as { message?: string })?.message ||
        'มีข้อผิดพลาด กรุณาลองใหม่อีกครั้งภายหลัง',
    });
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getCookie('refresh_token');

      if (refreshToken) {
        try {
          const response = await axios.post(
            `${baseURL}/api/auth/refresh_token`,
            { refresh_token: refreshToken },
            { headers: { 'Content-Type': 'application/json' } },
          );

          const newAccessToken = (response.data as { access_token: string }).access_token;
          setCookie('access_token', newAccessToken, 1);

          originalRequest.headers = originalRequest.headers ?? {};
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return api(originalRequest);
        } catch (err) {
          removePairTokens();
          window.location.href = '/';
          return Promise.reject(err);
        }
      } else {
        removePairTokens();
        window.location.href = '/';
      }
    }

    return Promise.reject(error);
  },
);

export default api;
