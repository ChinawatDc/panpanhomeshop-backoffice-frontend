'use client';

import { Button, Card, Form, Input, Space } from 'antd';

type UsersFilterProps = {
  onFilter: (values: any) => void;
  onReset: () => void;
};

export default function UsersFilter({ onFilter, onReset }: UsersFilterProps) {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    onFilter(values);
  };

  return (
    <Card style={{ marginBottom: 16 }}>
      <Form
        form={form}
        layout='vertical'
        onFinish={handleFinish}
        style={{ maxWidth: 600, margin: '0 auto' }}
      >
        {/* Inputs row */}
        <div style={{ display: 'flex', gap: 16 }}>
          <Form.Item name='first_name' label='ชื่อ' style={{ flex: 1 }}>
            <Input placeholder='ค้นหาชื่อ' allowClear />
          </Form.Item>
          <Form.Item name='last_name' label='นามสกุล' style={{ flex: 1 }}>
            <Input placeholder='ค้นหานามสกุล' allowClear />
          </Form.Item>
        </div>

        {/* Buttons row */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
          <Space>
            <Button type='primary' htmlType='submit'>
              ค้นหา
            </Button>
            <Button
              onClick={() => {
                form.resetFields();
                onReset();
              }}
            >
              ล้างค่า
            </Button>
          </Space>
        </div>
      </Form>
    </Card>
  );
}
