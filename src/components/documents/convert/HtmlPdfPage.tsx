'use client';
import { message } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { useState } from 'react';

import UploadDragger from '@/components/documents/UploadDragger';
import { convertHtmlToPdf } from '@/services/documents/convert.service';
import ConvertOptionsHtml from './html-to-pdf/ConvertOptionsHtml';
import PreviewHtml from './html-to-pdf/PreviewHtml';

export default function HtmlPdfPage() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleConvert = async () => {
    if (fileList.length === 0) {
      message.error('กรุณาเลือกไฟล์ HTML');
      return;
    }
    const file = fileList[0].originFileObj as File;
    if (!file) {
      message.error('ไม่พบไฟล์ที่อัปโหลด');
      return;
    }
    setLoading(true);
    setDownloadUrl(null);
    try {
      const pdfBlob = await convertHtmlToPdf(file);
      const url = window.URL.createObjectURL(pdfBlob);
      setDownloadUrl(url);
      message.success('แปลงไฟล์สำเร็จ');
    } catch (e) {
      console.error(e);
      message.error('เกิดข้อผิดพลาดในการแปลงไฟล์');
    } finally {
      setLoading(false);
    }
  };

  const currentFile: File | null =
    fileList.length > 0 && fileList[0].originFileObj ? (fileList[0].originFileObj as File) : null;

  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
      {/* ซ้าย: อัปโหลด + พรีวิว */}
      <div style={{ flex: 1 }}>
        <UploadDragger
          multiple={false}
          fileList={fileList}
          onChange={setFileList}
          accept='.html,.htm,text/html'
          text='ลากไฟล์ HTML มาวางที่นี่ หรือคลิกเพื่อเลือกไฟล์'
          hint='รองรับ .html, .htm'
        />

        <PreviewHtml file={currentFile} />
      </div>

      {/* ขวา: ตัวเลือก/แปลง/ดาวน์โหลด */}
      <ConvertOptionsHtml
        disabled={fileList.length === 0}
        loading={loading}
        onConvert={handleConvert}
        downloadUrl={downloadUrl}
      />
    </div>
  );
}
