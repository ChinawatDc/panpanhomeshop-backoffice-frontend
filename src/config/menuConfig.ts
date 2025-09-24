import { AuthItem, MenuItem } from '@/types/auth';

export const menuItems: MenuItem[] = [
  { key: 'home', name: 'หน้าแรก', path: '/' },
  { key: 'products', name: 'สินค้า', path: '/products' },
  { key: 'cart', name: 'ตะกร้า', path: '/cart' },
  // { key: 'profile', name: 'โปรไฟล์', path: '/profile' },
];

export const authItems: AuthItem[] = [
  { key: 'login', name: 'เข้าสู่ระบบ', path: '/auth/login', type: 'text' },
  { key: 'register', name: 'สมัครสมาชิก', path: '/auth/register', type: 'primary' },
];

export const adminItems: MenuItem[] = [
  { key: 'admin', name: 'แดชบอร์ด', path: '/admin' },
  { key: 'users', name: 'จัดการ User', path: '/admin/users' },
  { key: 'roles', name: 'จัดการ Role', path: '/admin/roles' },
  { key: 'permissions', name: 'จัดการ Permissions', path: '/admin/permissions' },
  { key: 'customers', name: 'จัดการ Customers', path: '/admin/customers' },
  { key: 'products', name: 'จัดการ Products', path: '/admin/products' },
  { key: 'orders', name: 'จัดการ Orders', path: '/admin/orders' },
  {
    key: 'settings',
    name: '⚙️ Settings',
    path: '/admin/settings',
    children: [
      { key: 'bot', name: '🤖 Bot', path: '/admin/settings/bot' },
      { key: 'master', name: '📂 Master', path: '/admin/settings/master' },
    ],
  },
];
