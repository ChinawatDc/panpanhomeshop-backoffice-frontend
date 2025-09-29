import JpgPdfPage from '@/components/documents/convert/JpgPdfPage';
import ToolPage from '@/components/documents/ToolPage';

export default function Page() {
  return (
    <ToolPage title='JPG เป็น PDF' description='แปลงไฟล์ JPG เป็น PDF'>
      <JpgPdfPage />;
    </ToolPage>
  );
}
