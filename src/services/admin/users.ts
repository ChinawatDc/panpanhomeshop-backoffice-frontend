import api from '@/services/api-axios.config';
import { User } from '@/types/admin/user';

// GET /api/admin/users
export async function listUsersService(
  page = 1,
  size = 20,
  filters?: { first_name?: string; last_name?: string },
) {
  const params: any = { page, size, ...filters };
  const res = await api.get('admin/users', { params });
  return res.data;
}

// POST /api/admin/users
export async function createUserService(payload: Partial<User>) {
  const res = await api.post('admin/users', payload);
  return res.data;
}

// PATCH /api/admin/users/:id
export async function updateUserService(id: number, payload: Partial<User>) {
  const res = await api.patch(`admin/users/${id}`, payload);
  return res.data;
}

// DELETE /api/admin/users/:id
export async function deleteUserService(id: number) {
  const res = await api.delete(`admin/users/${id}`);
  return res.data;
}
