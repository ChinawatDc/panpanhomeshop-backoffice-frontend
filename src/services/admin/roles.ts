import api from '@/services/api-axios.config';
import { Role } from '@/types/admin/role';

export async function listRolesService(
  page = 1,
  size = 20,
  filters?: { first_name?: string; last_name?: string },
) {
  const params: any = { page, size, ...filters };
  const res = await api.get('admin/roles', { params });
  return res.data;
}

export async function getRoleByIdService(id: number): Promise<Role> {
  const res = await api.get(`admin/roles/${id}`);
  return res.data;
}

export async function createRoleService(payload: Partial<Role>) {
  const res = await api.post('admin/roles', payload);
  return res.data;
}

export async function updateRoleService(id: number, payload: Partial<Role>) {
  const res = await api.put(`admin/roles/${id}`, payload);
  return res.data;
}

export async function deleteRoleService(id: number) {
  const res = await api.delete(`admin/roles/${id}`);
  return res.data;
}
