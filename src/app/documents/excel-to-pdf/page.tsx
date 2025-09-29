// app/documents/excel-to-pdf/page.tsx
'use client';
import ToolPage from '@/components/documents/ToolPage';
import ExcelPdfPage from '@/components/documents/convert/ExcelPdfPage';

export default function Page() {
  return (
    <ToolPage title='EXCEL เป็น PDF' description='แปลงไฟล์ Excel เป็น PDF'>
      <ExcelPdfPage />
    </ToolPage>
  );
}
