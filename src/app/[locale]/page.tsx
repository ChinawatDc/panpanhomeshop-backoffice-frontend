'use client';
import { Button, Card, Col, Row, Typography } from 'antd';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const { Title, Paragraph } = Typography;

const featuredProducts = [
  { id: 1, name: 'โซฟาหรู / Luxury Sofa', price: 15900, img: 'https://picsum.photos/400/300?1' },
  { id: 2, name: 'โต๊ะไม้โอ๊ค / Oak Table', price: 8900, img: 'https://picsum.photos/400/300?2' },
  {
    id: 3,
    name: 'โคมไฟดีไซน์ / Designer Lamp',
    price: 2500,
    img: 'https://picsum.photos/400/300?3',
  },
];

export default function HomePage() {
  const t = useTranslations('Home');

  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          textAlign: 'center',
          padding: '80px 20px',
          background: 'linear-gradient(180deg,#f0f6ff,#ffffff)',
          borderRadius: 12,
          marginBottom: 40,
        }}
      >
        <Title level={1} style={{ fontSize: '36px', marginBottom: 16 }}>
          {t('welcome')} <span style={{ color: '#1677ff' }}>PanPan Home</span> 🏠
        </Title>
        <Paragraph style={{ fontSize: '18px', color: '#555', marginBottom: 24 }}>
          {t('subtitle')}
        </Paragraph>
        <Button type='primary' size='large' href='/products'>
          {t('shopNow')}
        </Button>
      </section>

      {/* Featured Products */}
      <section>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 30 }}>
          {t('featured')}
        </Title>
        <Row gutter={[24, 24]}>
          {featuredProducts.map((p) => (
            <Col xs={24} sm={12} md={8} key={p.id}>
              <Link href={`/products/${p.id}`}>
                <Card
                  hoverable
                  cover={
                    <img alt={p.name} src={p.img} style={{ height: 200, objectFit: 'cover' }} />
                  }
                >
                  <Card.Meta title={p.name} description={`${p.price.toLocaleString()} บาท`} />
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </section>
    </div>
  );
}
