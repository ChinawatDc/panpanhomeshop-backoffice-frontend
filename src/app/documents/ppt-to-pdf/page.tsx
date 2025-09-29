// app/documents/ppt-to-pdf/page.tsx
'use client';
import ToolPage from '@/components/documents/ToolPage';
import PptPdfPage from '@/components/documents/convert/PptPdfPage';

export default function Page() {
  return (
    <ToolPage title='POWERPOINT เป็น PDF' description='แปลงไฟล์ PowerPoint เป็น PDF'>
      <PptPdfPage />
    </ToolPage>
  );
}
