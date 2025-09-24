'use client';

import DataTable from '@/components/admin/DataTable';
import UsersFilter from '@/components/admin/users/UsersFilter';
import { usePaginatedFetch } from '@/hooks/usePaginate';
import {
  createUserService,
  deleteUserService,
  listUsersService,
  updateUserService,
} from '@/services/admin/users';
import { User } from '@/types/admin/user';
import { Button, DatePicker, Form, Input, Modal, Space, message } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const columns = (onEdit: (user: User) => void, onDelete: (id: number) => void) => [
  { title: 'ID', dataIndex: 'id' },
  { title: 'ชื่อผู้ใช้', dataIndex: 'user_name' },
  { title: 'ชื่อจริง', dataIndex: 'first_name' },
  { title: 'นามสกุล', dataIndex: 'last_name' },
  { title: 'อีเมล', dataIndex: 'email' },
  { title: 'สิทธิ์', dataIndex: ['role', 'name'] },
  {
    title: 'Active',
    dataIndex: 'is_active',
    render: (v: boolean) => (v ? '✅' : '❌'),
  },
  {
    title: 'จัดการ',
    render: (_: unknown, record: User) => (
      <Space>
        <Button onClick={() => onEdit(record)}>แก้ไข</Button>
        <Button danger onClick={() => onDelete(record.id)}>
          ลบ
        </Button>
      </Space>
    ),
  },
];

export default function UsersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm();
  const [filterForm] = Form.useForm();

  const { data, page, size, total, loading, fetchData } = usePaginatedFetch<User>(listUsersService);

  useEffect(() => {
    fetchData(1, size);
  }, [fetchData, size]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const payload = {
        ...values,
        expire_date: values.expire_date ? values.expire_date.toISOString() : null,
      };

      if (editingUser) {
        await updateUserService(editingUser.id, payload);
        message.success('อัพเดทผู้ใช้สำเร็จ');
      } else {
        await createUserService(payload);
        message.success('สร้างผู้ใช้สำเร็จ');
      }

      setIsModalOpen(false);
      form.resetFields();
      setEditingUser(null);
      fetchData();
    } catch (err) {
      message.error('บันทึกไม่สำเร็จ');
    }
  };

  const handleDelete = async (id: number) => {
    await deleteUserService(id);
    message.success('ลบผู้ใช้สำเร็จ');
    fetchData();
  };

  return (
    <>
      <UsersFilter
        onFilter={(values) => fetchData(1, size, values)}
        onReset={() => fetchData(1, size)}
      />
      {/* เพิ่มผู้ใช้ */}
      <Button
        type='primary'
        onClick={() => {
          form.resetFields();
          setEditingUser(null);
          setIsModalOpen(true);
        }}
        style={{ marginBottom: 16 }}
      >
        เพิ่มผู้ใช้
      </Button>

      {/* ตารางผู้ใช้ */}
      <DataTable<User>
        data={data}
        columns={columns((u) => {
          setEditingUser(u);
          form.setFieldsValue({
            ...u,
            expire_date: u.expire_date ? dayjs(u.expire_date) : null,
          });
          setIsModalOpen(true);
        }, handleDelete)}
        loading={loading}
        page={page}
        size={size}
        total={total}
        onPageChange={(p, s) => fetchData(p, s)}
      />

      {/* Modal Add/Edit */}
      <Modal
        title={editingUser ? 'แก้ไขผู้ใช้' : 'เพิ่มผู้ใช้'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSubmit}
      >
        <Form form={form} layout='vertical'>
          <Form.Item name='user_name' label='ชื่อผู้ใช้' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name='first_name' label='ชื่อ' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name='last_name' label='นามสกุล' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name='email' label='อีเมล' rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name='expire_date' label='วันหมดอายุ'>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
