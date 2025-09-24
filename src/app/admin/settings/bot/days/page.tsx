'use client';

import DataTable from '@/components/admin/DataTable';
import { usePaginatedFetch } from '@/hooks/usePaginate';
import {
  createDayService,
  deleteDayService,
  listDaysService,
  updateDayService,
} from '@/services/admin/bot/days';
import { BotDay } from '@/types/admin/bot/day';
import { Button, Form, Input, Modal, Space, Switch, message } from 'antd';
import { useEffect, useState } from 'react';

const columns = (onEdit: (day: BotDay) => void, onDelete: (id: number) => void) => [
  { title: 'ID', dataIndex: 'id' },
  { title: 'ชื่อวัน', dataIndex: 'name' },
  { title: 'Active', dataIndex: 'is_active', render: (v: boolean) => (v ? '✅' : '❌') },
  {
    title: 'จัดการ',
    render: (_: unknown, record: BotDay) => (
      <Space>
        <Button onClick={() => onEdit(record)}>แก้ไข</Button>
        <Button danger onClick={() => onDelete(record.id)}>
          ลบ
        </Button>
      </Space>
    ),
  },
];

export default function DaysPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<BotDay | null>(null);
  const [form] = Form.useForm();

  const { data, page, size, total, loading, fetchData } =
    usePaginatedFetch<BotDay>(listDaysService);

  useEffect(() => {
    fetchData(1, size);
  }, [fetchData, size]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editing) {
        await updateDayService(editing.id, values);
        message.success('อัพเดทวันสำเร็จ');
      } else {
        await createDayService(values);
        message.success('สร้างวันสำเร็จ');
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
    await deleteDayService(id);
    message.success('ลบวันสำเร็จ');
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
        เพิ่มวัน
      </Button>

      <DataTable<BotDay>
        data={data}
        columns={columns((d) => {
          setEditing(d);
          form.setFieldsValue(d);
          setIsModalOpen(true);
        }, handleDelete)}
        loading={loading}
        page={page}
        size={size}
        total={total}
        onPageChange={(p, s) => fetchData(p, s)}
      />

      <Modal
        title={editing ? 'แก้ไขวัน' : 'เพิ่มวัน'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSubmit}
      >
        <Form form={form} layout='vertical'>
          <Form.Item name='name' label='ชื่อวัน' rules={[{ required: true }]}>
            <Input placeholder='เช่น จันทร์' />
          </Form.Item>
          <Form.Item name='is_active' label='สถานะ' valuePropName='checked' initialValue={true}>
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
