"use client";
import type { CartItem } from "@/types/cart"; // ✅ import type
import { Button, Table } from "antd";

const columns = [
  { title: "สินค้า", dataIndex: "name", key: "name" },
  { title: "ราคา", dataIndex: "price", key: "price" },
  { title: "จำนวน", dataIndex: "qty", key: "qty" },
];

const data: CartItem[] = [
  { key: "1", name: "โซฟา", price: 5900, qty: 1 },
  { key: "2", name: "โต๊ะไม้", price: 2500, qty: 2 },
];

export default function CartPage() {
  return (
    <div>
      <Table<CartItem> columns={columns} dataSource={data} pagination={false} />
      <div style={{ textAlign: "right", marginTop: 20 }}>
        <Button type="primary" href="/checkout">
          ไปชำระเงิน
        </Button>
      </div>
    </div>
  );
}
