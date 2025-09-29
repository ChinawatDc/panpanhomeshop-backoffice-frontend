'use client';

import { Typography } from 'antd';
import { ReactNode } from 'react';

const { Title, Paragraph } = Typography;

type Props = {
  title: string;
  description?: string;
  children: ReactNode;
  actionLabel?: string;
};

export default function ToolPage({ title, description, children }: Props) {
  return (
    <>
      <div style={{ marginBottom: 24 }}>
        <Title level={3} style={{ marginBottom: 8 }}>
          {title}
        </Title>
        {description && (
          <Paragraph type='secondary' style={{ marginBottom: 0 }}>
            {description}
          </Paragraph>
        )}
      </div>

      <div>{children}</div>
    </>
  );
}
