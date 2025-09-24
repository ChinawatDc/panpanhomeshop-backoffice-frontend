'use client';

import DataTable from '@/components/admin/DataTable';
import { usePaginatedFetch } from '@/hooks/usePaginate';
import {
  createBranchService,
  deleteBranchService,
  listBranchesService,
  updateBranchService,
} from '@/services/admin/bot/branches';
import { Branch } from '@/types/admin/bot/branch';
import { Button, Form, Input, Modal, Space, Switch, message } from 'antd';
import { useEffect, useState } from 'react';

const columns = (onEdit: (branch: Branch) => void, onDelete: (id: number) => void) => [
  { title: 'ID', dataIndex: 'id' },
  { title: 'ชื่อสาขา', dataIndex: 'name' },
  { title: 'ที่ตั้ง', dataIndex: 'location' },
  { title: 'Active', dataIndex: 'is_active', render: (v: boolean) => (v ? '✅' : '❌') },
  {
    title: 'จัดการ',
    render: (_: unknown, record: Branch) => (
      <Space>
        <Button onClick={() => onEdit(record)}>แก้ไข</Button>
        <Button danger onClick={() => onDelete(record.id)}>
          ลบ
        </Button>
      </Space>
    ),
  },
];

export default function BranchesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Branch | null>(null);
  const [form] = Form.useForm();

  const { data, page, size, total, loading, fetchData } =
    usePaginatedFetch<Branch>(listBranchesService);

  useEffect(() => {
    fetchData(1, size);
  }, [fetchData, size]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editing) {
        await updateBranchService(editing.id, values);
        message.success('อัพเดทสาขาสำเร็จ');
      } else {
        await createBranchService(values);
        message.success('สร้างสาขาสำเร็จ');
      }
      setIsModalOpen(false);
      form.resetFields();
      setEditing(null);
      fetchData();
    } catch {
      message.error('บันทึกไม่สำเร็จ');
    }
  };

  const handleDelete = async (id: number) => {
    await deleteBranchService(id);
    message.success('ลบสาขาสำเร็จ');
    fetchData();
  };

  return (
    <>
      <Button
        type='primary'
        onClick={() => {
          form.resetFields();
          setEditing(null);
          setIsModalOpen(true);
        }}
        style={{ marginBottom: 16 }}
      >
        เพิ่มสาขา
      </Button>

      <DataTable<Branch>
        data={data}
        columns={columns((b) => {
          setEditing(b);
          form.setFieldsValue(b);
          setIsModalOpen(true);
        }, handleDelete)}
        loading={loading}
        page={page}
        size={size}
        total={total}
        onPageChange={(p, s) => fetchData(p, s)}
      />

      <Modal
        title={editing ? 'แก้ไขสาขา' : 'เพิ่มสาขา'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSubmit}
      >
        <Form form={form} layout='vertical'>
          <Form.Item name='name' label='ชื่อสาขา' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name='location' label='ที่ตั้ง' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name='is_active' label='สถานะ' valuePropName='checked' initialValue={true}>
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
