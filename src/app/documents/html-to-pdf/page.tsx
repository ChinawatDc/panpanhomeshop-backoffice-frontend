'use client';
import HtmlPdfPage from '@/components/documents/convert/HtmlPdfPage';
import ToolPage from '@/components/documents/ToolPage';

export default function Page() {
  return (
    <ToolPage title='HTML เป็น PDF' description='แปลงไฟล์ HTML เป็น PDF'>
      <HtmlPdfPage />
    </ToolPage>
  );
}
