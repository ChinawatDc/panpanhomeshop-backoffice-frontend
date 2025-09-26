'use client';

import { docSections } from '@/config/docMenuConfig';
import { Card, Col, Row, Typography } from 'antd';
import Link from 'next/link';

const { Title } = Typography;

export default function DocumentsPage() {
  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>
        📝 เครื่องมือ PDF
      </Title>
      {docSections.map((section) => (
        <div key={section.title} style={{ marginBottom: 40 }}>
          <Title level={4}>{section.title}</Title>
          <Row gutter={[16, 16]}>
            {section.items.map((item) => (
              <Col xs={24} sm={12} md={8} lg={6} key={item.key}>
                <Link href={item.path}>
                  <Card hoverable style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 30, marginBottom: 12 }}>{item.icon}</div>
                    <div>{item.name}</div>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </div>
  );
}
