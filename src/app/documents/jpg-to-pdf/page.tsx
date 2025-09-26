import JpgPdfPage from "@/components/documents/convert/JpgPdfPage";


export default function Page() {
  return (
    <JpgPdfPage
      title='JPG เป็น PDF'
      description='เลือกไฟล์ JPG หลายไฟล์ แล้วรวมเป็น PDF ไฟล์เดียว'
      actionLabel='แปลงไฟล์'
    />
  );
}
