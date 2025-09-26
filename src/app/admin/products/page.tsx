'use client';

import DataTable from '@/components/admin/DataTable';
import { Button, Form, Input, Modal, Space, message } from 'antd';
import { useState } from 'react';

// Mock type
type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

// Mock data
const mockProducts: Product[] = [
  { id: 1, name: 'Bearbrick 400%', price: 9500, stock: 3 },
  { id: 2, name: 'Sonny Angel - Fruit Series', price: 450, stock: 20 },
  { id: 3, name: 'Labubu Space', price: 1200, stock: 5 },
];

const columns = (onEdit: (product: Product) => void, onDelete: (id: number) => void) => [
  { title: 'ID', dataIndex: 'id' },
  { title: 'ชื่อสินค้า', dataIndex: 'name' },
  { title: 'ราคา (บาท)', dataIndex: 'price' },
  { title: 'คงเหลือ', dataIndex: 'stock' },
  {
    title: 'จัดการ',
    render: (_: unknown, record: Product) => (
      <Space>
        <Button onClick={() => onEdit(record)}>แก้ไข</Button>
        <Button danger onClick={() => onDelete(record.id)}>
          ลบ
        </Button>
      </Space>
    ),
  },
];

export default function ProductsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form] = Form.useForm();
  const [data, setData] = useState<Product[]>(mockProducts);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (editingProduct) {
        setData((prev) => prev.map((p) => (p.id === editingProduct.id ? { ...p, ...values } : p)));
        message.success('อัพเดทสินค้าสำเร็จ');
      } else {
        setData((prev) => [...prev, { id: prev.length + 1, ...values } as Product]);
        message.success('เพิ่มสินค้าสำเร็จ');
      }

      setIsModalOpen(false);
      form.resetFields();
      setEditingProduct(null);
    } catch {
      message.error('บันทึกไม่สำเร็จ');
    }
  };

  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((p) => p.id !== id));
    message.success('ลบสินค้าสำเร็จ');
  };

  return (
    <>
      <Button
        type='primary'
        onClick={() => {
          form.resetFields();
          setEditingProduct(null);
          setIsModalOpen(true);
        }}
        style={{ marginBottom: 16 }}
      >
        เพิ่มสินค้า
      </Button>

      <DataTable<Product>
        data={data}
        columns={columns((r) => {
          setEditingProduct(r);
          form.setFieldsValue(r);
          setIsModalOpen(true);
        }, handleDelete)}
      />

      <Modal
        title={editingProduct ? 'แก้ไขสินค้า' : 'เพิ่มสินค้า'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSubmit}
      >
        <Form form={form} layout='vertical'>
          <Form.Item name='name' label='ชื่อสินค้า' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name='price'
            label='ราคา'
            rules={[{ required: true, type: 'number', transform: Number }]}
          >
            <Input type='number' />
          </Form.Item>
          <Form.Item
            name='stock'
            label='คงเหลือ'
            rules={[{ required: true, type: 'number', transform: Number }]}
          >
            <Input type='number' />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
