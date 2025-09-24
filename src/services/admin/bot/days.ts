import api from '@/services/api-axios.config';
import { BotDay } from '@/types/admin/bot/day';
import { PaginatedResponse } from '@/types/common/pagination';

export async function listDaysService(page = 1, size = 20): Promise<PaginatedResponse<BotDay>> {
  const res = await api.get(`/b/days?page=${page}&size=${size}`);
  return res.data;
}

export async function createDayService(payload: Partial<BotDay>) {
  const res = await api.post('/b/days', payload);
  return res.data;
}

export async function updateDayService(id: number, payload: Partial<BotDay>) {
  const res = await api.patch(`/b/days/${id}`, payload);
  return res.data;
}

export async function deleteDayService(id: number) {
  const res = await api.delete(`/b/days/${id}`);
  return res.data;
}
