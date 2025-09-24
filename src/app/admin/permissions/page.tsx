'use client';

import DataTable from '@/components/admin/DataTable';
import { usePaginatedFetch } from '@/hooks/usePaginate';
import {
  createPermissionService,
  deletePermissionService,
  listPermissionsService,
  updatePermissionService,
} from '@/services/admin/permissions';
import { Permission } from '@/types/admin/permission';
import { Button, Form, Input, Modal, Space, message } from 'antd';
import { useEffect, useState } from 'react';

const columns = (onEdit: (permission: Permission) => void, onDelete: (id: number) => void) => [
  { title: 'ID', dataIndex: 'id' },
  { title: 'ชื่อ Permission', dataIndex: 'name' },
  { title: 'Code', dataIndex: 'code' },
  { title: 'คำอธิบาย', dataIndex: 'description' },
  {
    title: 'จัดการ',
    render: (_: unknown, record: Permission) => (
      <Space>
        <Button onClick={() => onEdit(record)}>แก้ไข</Button>
        <Button danger onClick={() => onDelete(record.id)}>
          ลบ
        </Button>
      </Space>
    ),
  },
];

export default function PermissionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPermission, setEditingPermission] = useState<Permission | null>(null);
  const [form] = Form.useForm();

  const { data, page, size, total, loading, fetchData } =
    usePaginatedFetch<Permission>(listPermissionsService);

  useEffect(() => {
    fetchData(1, size);
  }, [fetchData, size]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingPermission) {
        await updatePermissionService(editingPermission.id, values);
        message.success('อัพเดท Permission สำเร็จ');
      } else {
        await createPermissionService(values);
        message.success('สร้าง Permission สำเร็จ');
      }
      setIsModalOpen(false);
      form.resetFields();
      setEditingPermission(null);
      fetchData();
    } catch (err) {
      message.error('บันทึกไม่สำเร็จ');
    }
  };

  const handleDelete = async (id: number) => {
    await deletePermissionService(id);
    message.success('ลบ Permission สำเร็จ');
    fetchData();
  };

  return (
    <>
      <Button
        type='primary'
        onClick={() => {
          form.resetFields();
          setEditingPermission(null);
          setIsModalOpen(true);
        }}
        style={{ marginBottom: 16 }}
      >
        เพิ่ม Permission
      </Button>

      <DataTable<Permission>
        data={data}
        columns={columns((p) => {
          setEditingPermission(p);
          form.setFieldsValue(p);
          setIsModalOpen(true);
        }, handleDelete)}
        loading={loading}
        page={page}
        size={size}
        total={total}
        onPageChange={(p, s) => fetchData(p, s)}
      />

      <Modal
        title={editingPermission ? 'แก้ไข Permission' : 'เพิ่ม Permission'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSubmit}
      >
        <Form form={form} layout='vertical'>
          <Form.Item name='name' label='ชื่อ Permission' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name='code' label='Code' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name='description' label='คำอธิบาย'>
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
