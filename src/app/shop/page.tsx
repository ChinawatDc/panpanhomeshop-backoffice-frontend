'use client';

import Loader from '@/components/common/Loader';
import { RootState } from '@/redux/store';
import { Button, Card, Col, Row, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const { Title, Paragraph } = Typography;

const featuredProducts = [
  { id: 1, name: 'โซฟาหรู', price: 15900, img: 'https://picsum.photos/400/300?1' },
  { id: 2, name: 'โต๊ะไม้โอ๊ค', price: 8900, img: 'https://picsum.photos/400/300?2' },
  { id: 3, name: 'โคมไฟดีไซน์', price: 2500, img: 'https://picsum.photos/400/300?3' },
];

export default function HomePage() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user !== null) {
      if (user.role_id === 1 || user.role_id === 3) {
        router.push('/admin');

        setLoading(false);
      }

      setLoading(false);
    } else {
      const timer = setTimeout(() => setLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [user, router]);

  if (loading) {
    return <Loader loading={true} />;
  }

  return (
    <div>
      {(!user || (user.role_id !== 1 && user.role_id !== 3)) && (
        <>
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
              ยินดีต้อนรับสู่ <span style={{ color: '#1677ff' }}>PanPan Home</span> 🏠
            </Title>
            <Paragraph style={{ fontSize: '18px', color: '#555', marginBottom: 24 }}>
              แหล่งรวมสินค้า Lifestyle และของใช้ในบ้านคุณภาพสูง
            </Paragraph>

            {!user ? (
              <Button type='primary' size='large' href='/auth/login'>
                🛒 ช้อปเลย
              </Button>
            ) : (
              <Button type='primary' size='large' href='/products'>
                🛒 ช้อปเลย
              </Button>
            )}
          </section>

          {user && user.role_id === 2 && (
            <section>
              <Title level={2} style={{ textAlign: 'center', marginBottom: 30 }}>
                สินค้าแนะนำ
              </Title>
              <Row gutter={[24, 24]}>
                {featuredProducts.map((p) => (
                  <Col xs={24} sm={12} md={8} key={p.id}>
                    <Card
                      hoverable
                      cover={
                        <img alt={p.name} src={p.img} style={{ height: 200, objectFit: 'cover' }} />
                      }
                      onClick={() => router.push(`/products/${p.id}`)}
                    >
                      <Card.Meta title={p.name} description={`${p.price.toLocaleString()} บาท`} />
                    </Card>
                  </Col>
                ))}
              </Row>
            </section>
          )}
        </>
      )}
    </div>
  );
}
