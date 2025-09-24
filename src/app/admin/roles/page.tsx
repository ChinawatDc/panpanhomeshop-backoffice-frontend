'use client';

import DataTable from '@/components/admin/DataTable';
import { usePaginatedFetch } from '@/hooks/usePaginate';
import {
  createRoleService,
  deleteRoleService,
  listRolesService,
  updateRoleService,
} from '@/services/admin/roles';
import { Role } from '@/types/admin/role';
import { Button, Form, Input, Modal, Space, message } from 'antd';
import { useEffect, useState } from 'react';

const columns = (onEdit: (role: Role) => void, onDelete: (id: number) => void) => [
  { title: 'ID', dataIndex: 'id' },
  { title: 'ชื่อ Role', dataIndex: 'name' },
  {
    title: 'คำอธิบาย',
    dataIndex: 'description',
  },
  {
    title: 'จัดการ',
    render: (_: unknown, record: Role) => (
      <Space>
        <Button onClick={() => onEdit(record)}>แก้ไข</Button>
        <Button danger onClick={() => onDelete(record.id)}>
          ลบ
        </Button>
      </Space>
    ),
  },
];

export default function RolesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [form] = Form.useForm();

  const { data, page, size, total, loading, fetchData } = usePaginatedFetch<Role>(listRolesService);

  useEffect(() => {
    fetchData(1, size);
  }, [fetchData, size]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (editingRole) {
        await updateRoleService(editingRole.id, values);
        message.success('อัพเดท Role สำเร็จ');
      } else {
        await createRoleService(values);
        message.success('สร้าง Role สำเร็จ');
      }

      setIsModalOpen(false);
      form.resetFields();
      setEditingRole(null);
      fetchData();
    } catch (err) {
      message.error('บันทึกไม่สำเร็จ');
    }
  };

  const handleDelete = async (id: number) => {
    await deleteRoleService(id);
    message.success('ลบ Role สำเร็จ');
    fetchData();
  };

  return (
    <>
      <Button
        type='primary'
        onClick={() => {
          form.resetFields();
          setEditingRole(null);
          setIsModalOpen(true);
        }}
        style={{ marginBottom: 16 }}
      >
        เพิ่ม Role
      </Button>

      <DataTable<Role>
        data={data}
        columns={columns((r) => {
          setEditingRole(r);
          form.setFieldsValue(r);
          setIsModalOpen(true);
        }, handleDelete)}
        loading={loading}
        page={page}
        size={size}
        total={total}
        onPageChange={(p, s) => fetchData(p, s)}
      />

      <Modal
        title={editingRole ? 'แก้ไข Role' : 'เพิ่ม Role'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSubmit}
      >
        <Form form={form} layout='vertical'>
          <Form.Item name='name' label='ชื่อ Role' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name='description' label='คำอธิบาย'>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
