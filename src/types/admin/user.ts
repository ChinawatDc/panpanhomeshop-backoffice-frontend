import { Role } from './role';

export interface User {
  id: number;
  email: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  role_id: number;
  role: Role;
  expire_date?: string | null;
  device_limit: number;
  user_name: string;
  first_name: string;
  last_name: string;
  start_date?: string | null;
}

export interface UserDevice {
  id: number;
  user_id: number;
  device_id: string;
  access_token: string;
  refresh_token: string;
  revoked: boolean;
  last_used_at: string;
  created_at: string;
  updated_at: string;
}
