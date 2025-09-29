// app/documents/word-to-pdf/page.tsx
'use client';

import WordPdfPage from '@/components/documents/convert/WordPdfPage';
import ToolPage from '@/components/documents/ToolPage';

export default function Page() {
  return (
    <ToolPage title='WORD เป็น PDF' description='แปลงไฟล์ Word เป็น PDF'>
      <WordPdfPage />
    </ToolPage>
  );
}
