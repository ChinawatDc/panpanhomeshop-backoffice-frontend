'use client';

import DataTable from '@/components/admin/DataTable';
import { usePaginatedFetch } from '@/hooks/usePaginate';
import {
  createTimeService,
  deleteTimeService,
  listTimesService,
  updateTimeService,
} from '@/services/admin/bot/times';
import { BotTime } from '@/types/admin/bot/time';
import { Button, Form, Modal, Space, Switch, TimePicker, message } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const columns = (onEdit: (time: BotTime) => void, onDelete: (id: number) => void) => [
  { title: 'ID', dataIndex: 'id' },
  { title: 'เวลาเริ่ม', dataIndex: 'start_time' },
  { title: 'เวลาสิ้นสุด', dataIndex: 'end_time' },
  { title: 'Active', dataIndex: 'is_active', render: (v: boolean) => (v ? '✅' : '❌') },
  {
    title: 'จัดการ',
    render: (_: unknown, record: BotTime) => (
      <Space>
        <Button onClick={() => onEdit(record)}>แก้ไข</Button>
        <Button danger onClick={() => onDelete(record.id)}>
          ลบ
        </Button>
      </Space>
    ),
  },
];

export default function TimesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<BotTime | null>(null);
  const [form] = Form.useForm();

  const { data, page, size, total, loading, fetchData } =
    usePaginatedFetch<BotTime>(listTimesService);

  useEffect(() => {
    fetchData(1, size);
  }, [fetchData, size]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        ...values,
        start_time: values.start_time ? values.start_time.format('HH:mm') : null,
        end_time: values.end_time ? values.end_time.format('HH:mm') : null,
      };
      if (editing) {
        await updateTimeService(editing.id, payload);
        message.success('อัพเดทเวลาสำเร็จ');
      } else {
        await createTimeService(payload);
        message.success('สร้างเวลาสำเร็จ');
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
    await deleteTimeService(id);
    message.success('ลบเวลาสำเร็จ');
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
        เพิ่มเวลา
      </Button>

      <DataTable<BotTime>
        data={data}
        columns={columns((t) => {
          setEditing(t);
          form.setFieldsValue({
            ...t,
            start_time: t.start_time ? dayjs(t.start_time, 'HH:mm') : null,
            end_time: t.end_time ? dayjs(t.end_time, 'HH:mm') : null,
          });
          setIsModalOpen(true);
        }, handleDelete)}
        loading={loading}
        page={page}
        size={size}
        total={total}
        onPageChange={(p, s) => fetchData(p, s)}
      />

      <Modal
        title={editing ? 'แก้ไขเวลา' : 'เพิ่มเวลา'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSubmit}
      >
        <Form form={form} layout='vertical'>
          <Form.Item name='start_time' label='เวลาเริ่ม' rules={[{ required: true }]}>
            <TimePicker format='HH:mm' style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name='end_time' label='เวลาสิ้นสุด' rules={[{ required: true }]}>
            <TimePicker format='HH:mm' style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name='is_active' label='สถานะ' valuePropName='checked' initialValue={true}>
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
