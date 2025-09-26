import { api } from '@/services/api-axios.config';
import { Permission } from '@/types/admin/permission';

export async function listPermissionsService(
  page = 1,
  size = 20,
  filters?: { first_name?: string; last_name?: string },
) {
  const params: any = { page, size, ...filters };
  const res = await api.get('admin/permissions', { params });
  return res.data;
}

export async function getPermissionByIdService(id: number): Promise<Permission> {
  const res = await api.get(`admin/permissions/${id}`);
  return res.data;
}

export async function createPermissionService(payload: Partial<Permission>) {
  const res = await api.post('admin/permissions', payload);
  return res.data;
}

export async function updatePermissionService(id: number, payload: Partial<Permission>) {
  const res = await api.put(`admin/permissions/${id}`, payload);
  return res.data;
}

export async function deletePermissionService(id: number) {
  const res = await api.delete(`admin/permissions/${id}`);
  return res.data;
}
