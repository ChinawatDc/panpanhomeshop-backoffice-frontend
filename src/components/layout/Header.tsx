'use client';

import {
  adminItems,
  authItems,
  crmItems,
  docItems,
  financeItems,
  hrItems,
  lawItems,
  portalItems,
  securityItems,
  shopItems, // ✅ import shopItems
} from '@/config/menuConfig';
import { getPublicIp } from '@/libs/getPublicIp';
import { removePairTokens } from '@/libs/token';
import { clearUser } from '@/redux/slices/authSlice';
import { RootState } from '@/redux/store';
import { logoutService } from '@/services/auth';
import { MenuItem } from '@/types/auth';
import { Avatar, Button, Dropdown, Layout, Menu, message, Space } from 'antd';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const { Header: AntHeader } = Layout;

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const handleLogout = async () => {
    try {
      const publicIp = await getPublicIp();
      const device_id = publicIp ?? navigator.userAgent ?? 'unknown-device';
      await logoutService(device_id);
      removePairTokens();
      dispatch(clearUser());
      message.success('ออกจากระบบสำเร็จ');
      router.push('/');
    } catch (err) {
      console.error(err);
      message.error('ออกจากระบบไม่สำเร็จ');
    }
  };

  // 🟢 เลือกเมนูอัตโนมัติตาม path
  const resolveMenuItems = (): MenuItem[] => {
    if (pathname.startsWith('/documents')) return docItems;
    if (pathname.startsWith('/admin')) return adminItems;
    if (pathname.startsWith('/law')) return lawItems;
    if (pathname.startsWith('/crm')) return crmItems;
    if (pathname.startsWith('/hr')) return hrItems;
    if (pathname.startsWith('/finance')) return financeItems;
    if (pathname.startsWith('/security')) return securityItems;
    if (pathname.startsWith('/portal')) return portalItems;
    if (pathname.startsWith('/shop')) return shopItems;
    return [];
  };

  const items = resolveMenuItems();

  // 🟢 เมนู User
  const userMenu = {
    items: [
      { key: 'profile', label: <Link href='/profile'>โปรไฟล์</Link> },
      { key: 'password', label: <Link href='/profile/change-password'>เปลี่ยนรหัสผ่าน</Link> },
      { key: 'logout', label: <span onClick={handleLogout}>ออกจากระบบ</span> },
    ],
  };

  return (
    <AntHeader
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#fff',
        padding: '0 30px',
        borderBottom: '1px solid #f0f0f0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      }}
    >
      {/* โลโก้ */}
      <Link href='/' style={{ textDecoration: 'none' }}>
        <div
          style={{
            fontWeight: 'bold',
            fontSize: '20px',
            color: '#1677ff',
            marginRight: 40,
            cursor: 'pointer',
          }}
        >
          PanPan Home 🏠
        </div>
      </Link>

      {/* เมนูกลาง */}
      {isMounted && (
        <Menu
          mode='horizontal'
          selectedKeys={[pathname]}
          style={{
            flex: 1,
            minWidth: 400,
            background: 'transparent',
            borderBottom: 'none',
          }}
          items={items.map((item) => ({
            key: item.path,
            label: <Link href={item.path}>{item.name}</Link>,
            children: item.children?.map((child) => ({
              key: child.path,
              label: <Link href={child.path}>{child.name}</Link>,
            })),
          }))}
        />
      )}

      {/* User ขวา */}
      <div>
        {!isMounted ? null : !user ? (
          <Space>
            {authItems.map((btn) => (
              <Button
                key={btn.key}
                type={btn.type}
                href={btn.path}
                style={btn.type === 'text' ? { color: '#1677ff' } : {}}
              >
                {btn.name}
              </Button>
            ))}
          </Space>
        ) : (
          <Dropdown menu={userMenu} placement='bottomRight'>
            <Avatar style={{ backgroundColor: '#1677ff', cursor: 'pointer' }}>
              {user.first_name?.[0] || user.email[0]}
            </Avatar>
          </Dropdown>
        )}
      </div>
    </AntHeader>
  );
}
