import { Button, ConfigProvider, Layout, Menu } from 'antd';
import { NextIntlClientProvider, useTranslations } from 'next-intl';
import { Prompt } from 'next/font/google';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

const { Header, Content, Footer } = Layout;

const prompt = Prompt({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin', 'thai'],
  display: 'swap',
});

export function generateStaticParams() {
  return [{ locale: 'th' }, { locale: 'en' }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params; // ✅ ใช้ await params ตรงนี้

  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} className={prompt.className}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ConfigProvider
            theme={{
              token: {
                fontFamily: 'Prompt, sans-serif',
                colorPrimary: '#1677ff',
                borderRadius: 8,
              },
            }}
          >
            <Layout style={{ minHeight: '100vh' }}>
              <HeaderBar locale={locale} />
              <Content style={{ padding: '40px 20px', background: '#f9fafc' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>{children}</div>
              </Content>
              <FooterBar />
            </Layout>
          </ConfigProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

function HeaderBar({ locale }: { locale: string }) {
  const t = useTranslations('Nav');
  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(90deg,#1677ff,#0052cc)',
        padding: '0 40px',
      }}
    >
      <div
        style={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: '20px',
          marginRight: 40,
        }}
      >
        PanPan Home 🏠
      </div>
      <Menu
        theme='dark'
        mode='horizontal'
        style={{ flex: 1, background: 'transparent' }}
        items={[
          { key: '1', label: <Link href={`/${locale}`}>{t('home')}</Link> },
          { key: '2', label: <Link href={`/${locale}/products`}>{t('products')}</Link> },
          { key: '3', label: <Link href={`/${locale}/cart`}>{t('cart')}</Link> },
          { key: '4', label: <Link href={`/${locale}/profile`}>{t('profile')}</Link> },
        ]}
      />
      <div>
        <Button type='text' href={`/${locale}/auth/login`} style={{ color: 'white' }}>
          {t('login')}
        </Button>
        <Button type='primary' href={`/${locale}/auth/register`}>
          {t('register')}
        </Button>
      </div>
    </Header>
  );
}

function FooterBar() {
  const t = useTranslations('Footer');
  return (
    <Footer style={{ textAlign: 'center', fontSize: '14px', background: '#fff' }}>
      © {new Date().getFullYear()} PanPan Home | {t('tagline')}
    </Footer>
  );
}
