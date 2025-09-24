
import api from '@/services/api-axios.config';
import { BotTime } from '@/types/admin/bot/time';
import { PaginatedResponse } from '@/types/common/pagination';

export async function listTimesService(page = 1, size = 20): Promise<PaginatedResponse<BotTime>> {
  const res = await api.get(`/b/times?page=${page}&size=${size}`);
  return res.data;
}

export async function createTimeService(payload: Partial<BotTime>) {
  const res = await api.post('/b/times', payload);
  return res.data;
}

export async function updateTimeService(id: number, payload: Partial<BotTime>) {
  const res = await api.patch(`/b/times/${id}`, payload);
  return res.data;
}

export async function deleteTimeService(id: number) {
  const res = await api.delete(`/b/times/${id}`);
  return res.data;
}
