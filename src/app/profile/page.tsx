'use client';

import { RootState } from '@/redux/store';
import { Order } from '@/types/cart';
import { Card, Descriptions, Table, Tabs } from 'antd';
import { useSelector } from 'react-redux';

const orders: Order[] = [
  {
    key: '1',
    orderId: 'ORD1234',
    date: '2025-09-01',
    total: 2500,
    status: 'กำลังจัดส่ง',
  },
  {
    key: '2',
    orderId: 'ORD1235',
    date: '2025-09-05',
    total: 5900,
    status: 'จัดส่งสำเร็จ',
  },
];

const orderColumns = [
  { title: 'รหัสคำสั่งซื้อ', dataIndex: 'orderId', key: 'orderId' },
  { title: 'วันที่', dataIndex: 'date', key: 'date' },
  { title: 'ยอดรวม', dataIndex: 'total', key: 'total' },
  { title: 'สถานะ', dataIndex: 'status', key: 'status' },
];

export default function ProfilePage() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <Card title='โปรไฟล์ของฉัน' variant='borderless'>
      <Tabs
        defaultActiveKey='1'
        items={[
          {
            key: '1',
            label: 'ข้อมูลส่วนตัว',
            children: user ? (
              <Descriptions bordered column={1} size='small'>
                <Descriptions.Item label='ชื่อผู้ใช้'>{user.user_name}</Descriptions.Item>
                <Descriptions.Item label='อีเมล'>{user.email}</Descriptions.Item>
                <Descriptions.Item label='ชื่อ-นามสกุล'>
                  {user.first_name} {user.last_name}
                </Descriptions.Item>
                <Descriptions.Item label='สถานะบัญชี'>
                  {user.is_active ? 'ใช้งานอยู่' : 'ถูกระงับ'}
                </Descriptions.Item>
                <Descriptions.Item label='สิทธิ์ผู้ใช้'>
                  {user.role.name} (role_id: {user.role_id})
                </Descriptions.Item>
                <Descriptions.Item label='สร้างเมื่อ'>
                  {new Date(user.created_at).toLocaleString()}
                </Descriptions.Item>
              </Descriptions>
            ) : (
              <p>ยังไม่ได้เข้าสู่ระบบ</p>
            ),
          },
          {
            key: '2',
            label: 'คำสั่งซื้อของฉัน',
            children: (
              <Table<Order> columns={orderColumns} dataSource={orders} pagination={false} />
            ),
          },
        ]}
      />
    </Card>
  );
}
