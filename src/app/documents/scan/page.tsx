// src/app/documents/scan/page.tsx
import ToolPage from '@/components/documents/ToolPage';
export default function Page() {
  return (
    <ToolPage
      title='สแกนเป็น PDF'
      description='อัปโหลดภาพเพื่อแปลงเป็น PDF'
      actionLabel='สร้าง PDF'
    />
  );
}
