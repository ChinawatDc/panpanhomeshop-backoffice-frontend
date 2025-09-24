import api from '@/services/api-axios.config';
import { Branch } from '@/types/admin/bot/branch';
import { PaginatedResponse } from '@/types/common/pagination';

export async function listBranchesService(page = 1, size = 20): Promise<PaginatedResponse<Branch>> {
  const res = await api.get(`/b/branches?page=${page}&size=${size}`);
  return res.data;
}

export async function createBranchService(payload: Partial<Branch>) {
  const res = await api.post('/b/branches', payload);
  return res.data;
}

export async function updateBranchService(id: number, payload: Partial<Branch>) {
  const res = await api.patch(`/b/branches/${id}`, payload);
  return res.data;
}

export async function deleteBranchService(id: number) {
  const res = await api.delete(`/b/branches/${id}`);
  return res.data;
}
