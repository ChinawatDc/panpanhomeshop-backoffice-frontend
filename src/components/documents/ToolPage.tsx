'use client';

import { UploadOutlined } from '@ant-design/icons';
import { Button, Card, Typography, Upload } from 'antd';

const { Title, Paragraph } = Typography;

type Props = {
  title: string;
  description?: string;
  actionLabel?: string;
};

export default function ToolPage({ title, description, actionLabel }: Props) {
  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '40px 20px' }}>
      <Card>
        <Title level={3} style={{ marginBottom: 16 }}>
          {title}
        </Title>
        {description && <Paragraph style={{ marginBottom: 24 }}>{description}</Paragraph>}

        <Upload.Dragger name='file' multiple={false} style={{ marginBottom: 24 }}>
          <p className='ant-upload-drag-icon'>
            <UploadOutlined />
          </p>
          <p className='ant-upload-text'>คลิกหรือลากไฟล์มาที่นี่</p>
        </Upload.Dragger>

        <Button type='primary' block>
          {actionLabel || 'ดำเนินการ'}
        </Button>
      </Card>
    </div>
  );
}
