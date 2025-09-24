'use client';

import { Layout } from 'antd';

const { Footer: AntFooter } = Layout;

export default function Footer() {
  return (
    <AntFooter style={{ textAlign: 'center', fontSize: '14px', background: '#fff' }}>
      © {new Date().getFullYear()} PanPan Home | Lifestyle & Home Goods
    </AntFooter>
  );
}
