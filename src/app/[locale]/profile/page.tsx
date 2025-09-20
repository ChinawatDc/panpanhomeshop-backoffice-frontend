"use client";
import { Order } from "@/types/cart";
import { Card, Descriptions, Table, Tabs } from "antd";

const orders: Order[] = [
  {
    key: "1",
    orderId: "ORD1234",
    date: "2025-09-01",
    total: 2500,
    status: "กำลังจัดส่ง",
  },
  {
    key: "2",
    orderId: "ORD1235",
    date: "2025-09-05",
    total: 5900,
    status: "จัดส่งสำเร็จ",
  },
];

const orderColumns = [
  { title: "รหัสคำสั่งซื้อ", dataIndex: "orderId", key: "orderId" },
  { title: "วันที่", dataIndex: "date", key: "date" },
  { title: "ยอดรวม", dataIndex: "total", key: "total" },
  { title: "สถานะ", dataIndex: "status", key: "status" },
];

export default function ProfilePage() {
  return (
    <Card title="โปรไฟล์ของฉัน" variant="borderless">
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label: "ข้อมูลส่วนตัว",
            children: (
              <Descriptions bordered column={1} size="small">
                <Descriptions.Item label="ชื่อผู้ใช้">
                  panpan_user
                </Descriptions.Item>
                <Descriptions.Item label="อีเมล">
                  user@example.com
                </Descriptions.Item>
                <Descriptions.Item label="เบอร์โทร">
                  081-234-5678
                </Descriptions.Item>
                <Descriptions.Item label="ที่อยู่">
                  123/45 หมู่บ้าน PanPan Home, กรุงเทพฯ
                </Descriptions.Item>
              </Descriptions>
            ),
          },
          {
            key: "2",
            label: "คำสั่งซื้อของฉัน",
            children: (
              <Table<Order>
                columns={orderColumns}
                dataSource={orders}
                pagination={false}
              />
            ),
          },
        ]}
      />
    </Card>
  );
}
