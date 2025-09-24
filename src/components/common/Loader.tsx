'use client';

import { useMemo } from 'react';

type LoaderProps = {
  loading: boolean;
};

export default function Loader({ loading }: LoaderProps) {
  // 🎲 เลือกรูปแบบสุ่ม (hook ต้องอยู่บนสุดเสมอ)
  const randomGif = useMemo(() => {
    const gifs = ['/icon/hedgehog-loading.gif', '/icon/hedgehog-run-loading.gif'];
    return gifs[Math.floor(Math.random() * gifs.length)];
  }, []);

  if (!loading) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backdropFilter: 'blur(6px)',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
      }}
    >
      <img src={randomGif} alt='loading...' style={{ width: 150, maxWidth: '40%' }} />
    </div>
  );
}
