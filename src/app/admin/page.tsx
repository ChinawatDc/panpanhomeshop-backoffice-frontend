'use client';

import { RootState } from '@/redux/store';
import { Card, Col, Row, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const { Title, Paragraph } = Typography;

export default function HomePage() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  if (user && (user.role_id === 1 || user.role_id === 3)) {
    return (
      <div style={{ padding: 40 }}>
        <Title level={2}>📊 Admin Dashboard</Title>
        <Paragraph>
          สวัสดี {user.first_name} {user.last_name}!
        </Paragraph>

        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <Card hoverable onClick={() => router.push('/admin/users')}>
              <Card.Meta title='👥 จัดการผู้ใช้' description='เพิ่ม/แก้ไข/ลบผู้ใช้งาน' />
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card hoverable onClick={() => router.push('/admin/products')}>
              <Card.Meta title='📦 จัดการสินค้า' description='อัปเดตและดูแลสินค้า' />
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card hoverable onClick={() => router.push('/admin/orders')}>
              <Card.Meta title='🧾 จัดการคำสั่งซื้อ' description='ตรวจสอบและอัปเดตสถานะ' />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }

  return <div></div>;
}
