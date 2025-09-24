'use client';

import { Layout, Menu } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useMemo } from 'react';

const { Sider, Content } = Layout;

export default function SettingsLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const pathParts = pathname.split('/'); // ['', 'admin', 'settings', 'bot', 'days']
  const selectedKey = pathParts.slice(2).join('/'); // settings/bot/days
  const openKey = pathParts[3]; // bot | master

  const items = useMemo(
    () => [
      {
        key: 'bot',
        label: '🤖 Bot',
        children: [
          {
            key: 'settings/bot/branches',
            label: <Link href='/admin/settings/bot/branches'>Branches</Link>,
          },
          { key: 'settings/bot/days', label: <Link href='/admin/settings/bot/days'>Days</Link> },
          { key: 'settings/bot/times', label: <Link href='/admin/settings/bot/times'>Times</Link> },
        ],
      },
      {
        key: 'master',
        label: '📂 Master',
        children: [
          { key: 'settings/master', label: <Link href='/admin/settings/master'>Overview</Link> },
        ],
      },
    ],
    [],
  );

  return (
    <Layout style={{ minHeight: '80vh', background: '#fff' }}>
      <Sider width={220} theme='light'>
        <Menu
          mode='inline'
          selectedKeys={[selectedKey]}
          defaultOpenKeys={[openKey]}
          items={items}
          style={{ height: '100%', borderRight: 0 }}
        />
      </Sider>
      <Layout style={{ padding: '20px' }}>
        <Content style={{ background: '#fff', padding: 24, borderRadius: 8 }}>{children}</Content>
      </Layout>
    </Layout>
  );
}
