// src/app/documents/delete-pages/page.tsx
import ToolPage from '@/components/documents/ToolPage';
export default function Page() {
  return (
    <ToolPage
      title='ลบหน้าออกจาก PDF'
      description='เลือกหน้าที่ต้องการลบออกจาก PDF'
      actionLabel='ลบหน้า'
    />
  );
}
