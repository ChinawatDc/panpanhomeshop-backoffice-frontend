"use client";
import { Button, Typography } from "antd";

const { Title, Paragraph } = Typography;

type Props = { params: { id: string } };

export default function ProductDetail({ params }: Props) {
  return (
    <div>
      <Title level={3}>รายละเอียดสินค้า #{params.id}</Title>
      <Paragraph>รายละเอียดของสินค้าชิ้นนี้</Paragraph>
      <Button type="primary">เพิ่มลงตะกร้า</Button>
    </div>
  );
}
