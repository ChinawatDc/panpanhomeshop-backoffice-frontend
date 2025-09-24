type LoginFormValues = {
  identifier: string;
  password: string;
  username?: string;
  user_name: string;
  first_name: string;
  last_name: string;
  password: string;
};

export interface RegisterFormValues extends LoginFormValues {
  username: string;
}

export interface AuthItem {
  key: string;
  name: string;
  path: string;
  type: 'text' | 'primary';
}

// types/auth.ts หรือ types/menu.ts
export interface MenuItem {
  key: string;
  name: string;
  path: string;
  children?: MenuItem[]; // ✅ เพิ่มได้
}

export type LoginPayload = {
  email: string;
  password: string;
  device_id: string;
};

export type RegisterPayload = {
  email: string;
  user_name: string;
  first_name: string;
  last_name: string;
  password: string;
  device_id: string;
};
