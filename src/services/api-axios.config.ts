import { getCookie, getPairTokens, removePairTokens, setCookie } from '@/libs/token';
import { notification } from 'antd';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

// Base URL ของ main API
let baseURL = 'http://pan-home.trueddns.com:30746';

// Base URL ของ Document API
let baseDocURL = process.env.NEXT_PUBLIC_BASEURL_API_DOC || 'http://localhost:8081';

if (process.env.NODE_ENV === 'production') {
  baseURL = process.env.NEXT_PUBLIC_BASEURL_API_PROD || baseURL;
  baseDocURL = process.env.NEXT_PUBLIC_BASEURL_API_DOC || baseDocURL;
} else if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  baseURL = process.env.NEXT_PUBLIC_BASEURL_API_DEV || baseURL;
  baseDocURL = process.env.NEXT_PUBLIC_BASEURL_API_DOC || baseDocURL;
}

// ====================
// Core API
// ====================
const api = axios.create({
  baseURL: `${baseURL}/api/`,
});
const apiAuth = axios.create({
  baseURL: `${baseURL}/api/`,
});

// ====================
// Document API
// ====================
const apiDoc = axios.create({
  baseURL: `${baseDocURL}/api-doc/`,
});

// ====================
// Interceptors (ใช้ร่วมกัน)
// ====================
const setupInterceptors = (instance: typeof api) => {
  instance.interceptors.request.use(
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

  instance.interceptors.response.use(
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

            return instance(originalRequest);
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
};

// ติดตั้ง interceptors ให้ทั้ง 2 instance
setupInterceptors(api);
setupInterceptors(apiDoc);

// export แบบ named
export { api, apiAuth, apiDoc };
