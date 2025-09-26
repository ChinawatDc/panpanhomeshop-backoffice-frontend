'use client';

import DataTable from '@/components/admin/DataTable';
import { Button, Space, Tag } from 'antd';

// Mock type
type Order = {
  id: number;
  customer: string;
  total: number;
  status: 'pending' | 'paid' | 'shipped';
};

// Mock data
const mockOrders: Order[] = [
  { id: 101, customer: 'คุณสมชาย', total: 1500, status: 'pending' },
  { id: 102, customer: 'คุณพลอย', total: 4200, status: 'paid' },
  { id: 103, customer: 'คุณปิ่น', total: 820, status: 'shipped' },
];

const statusColor: Record<Order['status'], string> = {
  pending: 'orange',
  paid: 'green',
  shipped: 'blue',
};

const columns = () => [
  { title: 'เลขที่ออเดอร์', dataIndex: 'id' },
  { title: 'ลูกค้า', dataIndex: 'customer' },
  { title: 'ยอดรวม (บาท)', dataIndex: 'total' },
  {
    title: 'สถานะ',
    dataIndex: 'status',
    render: (status: Order['status']) => (
      <Tag color={statusColor[status]}>
        {status === 'pending' ? 'รอดำเนินการ' : status === 'paid' ? 'ชำระแล้ว' : 'จัดส่งแล้ว'}
      </Tag>
    ),
  },
  {
    title: 'การจัดการ',
    render: () => (
      <Space>
        <Button>ดูรายละเอียด</Button>
        <Button type='primary'>อัพเดท</Button>
      </Space>
    ),
  },
];

export default function OrdersPage() {
  return (
    <div>
      <h2 style={{ marginBottom: 16 }}>รายการคำสั่งซื้อ</h2>
      <DataTable<Order> data={mockOrders} columns={columns()} />
    </div>
  );
}
