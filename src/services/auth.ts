import { setCookie } from '@/libs/token';
import api from '@/services/api-axios.config';
import { LoginPayload, RegisterPayload } from '@/types/auth';

export async function loginService(payload: LoginPayload) {
  const res = await api.post('auth/login', payload);
  const { access_token, refresh_token } = res.data;
  setCookie('access_token', access_token, 1);
  setCookie('refresh_token', refresh_token, 7);
  return res.data;
}

export async function registerService(payload: RegisterPayload) {
  const res = await api.post('auth/register', payload);
  const { access_token, refresh_token } = res.data;
  setCookie('access_token', access_token, 1);
  setCookie('refresh_token', refresh_token, 7);
  return res.data;
}

export async function getMeService() {
  const res = await api.get('me');
  return res.data;
}

export async function logoutService(device_id: string) {
  const res = await api.post('auth/logout', { device_id });
  return res.data;
}
