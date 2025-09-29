'use client';
import { useEffect, useMemo, useState } from 'react';

export default function PreviewHtml({ file }: { file: File | null }) {
  const [htmlText, setHtmlText] = useState<string>('');

  useEffect(() => {
    if (!file) {
      setHtmlText('');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = (e.target?.result as string) || '';
      setHtmlText(text);
    };
    reader.readAsText(file, 'utf-8');
  }, [file]);

  // ใช้ srcDoc เพื่อความปลอดภัย + ไม่ต้องสร้าง Blob URL
  const iframeProps = useMemo(
    () =>
      htmlText
        ? {
            srcDoc: htmlText,
          }
        : {},
    [htmlText],
  );

  return (
    <div
      style={{
        border: '1px solid #eee',
        borderRadius: 8,
        overflow: 'hidden',
        background: '#fff',
      }}
    >
      {file ? (
        <iframe
          {...iframeProps}
          style={{ width: '100%', height: 420, border: 'none' }}
          sandbox='allow-same-origin'
          title='HTML Preview'
        />
      ) : (
        <div
          style={{
            padding: 16,
            color: '#888',
            textAlign: 'center',
            height: 180,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#fafafa',
          }}
        >
          ไม่มีไฟล์สำหรับพรีวิว
        </div>
      )}
    </div>
  );
}
