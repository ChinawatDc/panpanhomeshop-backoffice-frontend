'use client';

import { adminItems, authItems, menuItems } from '@/config/menuConfig';
import { getPublicIp } from '@/libs/getPublicIp';
import { removePairTokens } from '@/libs/token';
import { clearUser } from '@/redux/slices/authSlice';
import { RootState } from '@/redux/store';
import { logoutService } from '@/services/auth';
import { Avatar, Button, Dropdown, Layout, Menu, message, Space } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const { Header: AntHeader } = Layout;

export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  // ✅ render menu หลัง mount เท่านั้น
  let items = [{ key: 'home', label: <Link href='/'>หน้าแรก</Link> }];
  if (isMounted && user) {
    if (user.role_id === 1 || user.role_id === 3) {
      items = adminItems.map((i) => ({
        key: i.key,
        label: <Link href={i.path}>{i.name}</Link>,
      }));
    } else if (user.role_id === 2) {
      items = menuItems.map((i) => ({
        key: i.key,
        label: <Link href={i.path}>{i.name}</Link>,
      }));
    }
  }

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
        background: 'linear-gradient(90deg,#1677ff,#0052cc)',
        padding: '0 40px',
      }}
    >
      <div
        style={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: '20px',
          marginRight: 40,
        }}
      >
        PanPan Home 🏠
      </div>

      {/* Main Menu */}
      {isMounted && (
        <Menu
          theme='dark'
          mode='horizontal'
          style={{ flex: 1, background: 'transparent' }}
          items={adminItems.map((item) => ({
            key: item.key,
            label: <Link href={item.path}>{item.name}</Link>,
            children: item.children?.map((child) => ({
              key: child.key,
              label: <Link href={child.path}>{child.name}</Link>,
            })),
          }))}
        />
      )}

      {/* Auth / User */}
      <div>
        {!isMounted ? null : !user ? (
          <Space>
            {authItems.map((btn) => (
              <Button
                key={btn.key}
                type={btn.type}
                href={btn.path}
                style={btn.type === 'text' ? { color: 'white' } : {}}
              >
                {btn.name}
              </Button>
            ))}
          </Space>
        ) : (
          <Dropdown menu={userMenu} placement='bottomRight'>
            <Avatar style={{ backgroundColor: '#87d068', cursor: 'pointer' }}>
              {user.first_name?.[0] || user.email[0]}
            </Avatar>
          </Dropdown>
        )}
      </div>
    </AntHeader>
  );
}
