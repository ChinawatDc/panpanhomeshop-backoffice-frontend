'use client';

import { RootState } from '@/redux/store';
import { Card, Col, Row } from 'antd';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function HomePage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // ป้องกัน Hydration error
    return <div />;
  }

  // 🟢 กำหนดเมนูหลัก (ไม่เอาย่อย)
  const mainMenus = [
    { key: 'shop', name: '🛍️ ร้านค้า', path: '/shop' },
    { key: 'documents', name: '📄 จัดการเอกสาร', path: '/documents' },
    { key: 'law', name: '⚖️ ระบบกฎหมาย', path: '/law' },
    { key: 'crm', name: '📱 CRM & Member', path: '/crm' },
    { key: 'hr', name: '🏢 HR & Employee', path: '/hr' },
    { key: 'finance', name: '💰 การเงิน & บัญชี', path: '/finance' },
    { key: 'security', name: '🔒 Security', path: '/security' },
    { key: 'portal', name: '🌐 Portal & CMS', path: '/portal' },
  ];

  // ถ้าเป็น admin role ให้โชว์ admin ด้วย
  if (user?.role_id === 1 || user?.role_id === 3) {
    mainMenus.push({ key: 'admin', name: '🛠️ Admin Dashboard', path: '/admin' });
  }

  return (
    <div style={{ padding: 40 }}>
      <Row gutter={[24, 24]}>
        {mainMenus.map((menu) => (
          <Col key={menu.key} xs={24} sm={12} md={8} lg={6}>
            <Link href={menu.path}>
              <Card
                hoverable
                style={{
                  borderRadius: 12,
                  textAlign: 'center',
                  height: 140,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  fontSize: 18,
                  fontWeight: 500,
                }}
              >
                {menu.name}
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}
