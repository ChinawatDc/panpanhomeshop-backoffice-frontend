"use client";
import { Card, Col, Row } from "antd";
import Link from "next/link";

const mockProducts = [
  { id: 1, name: "โซฟา", price: 5900 },
  { id: 2, name: "โต๊ะไม้", price: 2500 },
];

export default function ProductList() {
  return (
    <Row gutter={[16, 16]}>
      {mockProducts.map((p) => (
        <Col span={12} key={p.id}>
          <Link href={`/products/${p.id}`}>
            <Card hoverable title={p.name}>
              ราคา: {p.price.toLocaleString()} บาท
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  );
}
