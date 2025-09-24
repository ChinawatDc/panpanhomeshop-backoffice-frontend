'use client';
import store from '@/redux/store';
import { ConfigProvider, Layout, notification } from 'antd';
import 'antd/dist/reset.css';
import dynamic from 'next/dynamic';
import { Prompt } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import './globals.css';

const Header = dynamic(() => import('@/components/layout/Header'), { ssr: false });
const Footer = dynamic(() => import('@/components/layout/Footer'), { ssr: false });
const { Content } = Layout;

const prompt = Prompt({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin', 'thai'],
  display: 'swap',
});

// notification.config({
//   className: prompt.className,
// });

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hiddenPaths = ['/auth', '/test', '/loadtes'];
  const isHiddenLayout = hiddenPaths.some((path) => pathname.startsWith(path));

  return (
    <html lang='th'>
      <body className={prompt.className}>
        <Provider store={store}>
          <ConfigProvider
            theme={{
              token: {
                fontFamily: prompt.style.fontFamily,
                colorPrimary: '#1677ff',
                borderRadius: 8,
              },
            }}
          >
            <Layout style={{ minHeight: '100vh' }}>
              {!isHiddenLayout && <Header />}
              <Content style={{ padding: '40px 20px', background: '#f9fafc' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>{children}</div>
              </Content>
              {!isHiddenLayout && <Footer />}
            </Layout>
          </ConfigProvider>
        </Provider>
      </body>
    </html>
  );
}
