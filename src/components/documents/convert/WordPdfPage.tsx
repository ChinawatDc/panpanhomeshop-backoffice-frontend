'use client';
import { convertWordToPdf } from '@/services/documents/convert.service';
import { message } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { useState } from 'react';
import UploadDragger from '../UploadDragger';
import ConvertOptions from './word-to-pdf/ConvertOptions';
import PreviewList from './word-to-pdf/PreviewList';

export default function WordPdfPage() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [merge, setMerge] = useState(true);

  const handleUpload = async () => {
    if (fileList.length === 0) {
      message.error('กรุณาเลือกไฟล์ Word อย่างน้อย 1 ไฟล์');
      return;
    }
    setLoading(true);
    setDownloadUrl(null);
    try {
      const files = fileList.map((f) => f.originFileObj as File).filter(Boolean);
      const pdfBlob = await convertWordToPdf(files, { merge });
      const url = window.URL.createObjectURL(pdfBlob);
      setDownloadUrl(url);
      message.success('แปลงไฟล์สำเร็จ');
    } catch (err) {
      console.error(err);
      message.error('เกิดข้อผิดพลาดในการแปลงไฟล์');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (uid: string) => {
    setFileList((prev) => prev.filter((f) => f.uid !== uid));
  };

  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
      <div style={{ flex: 1 }}>
        <UploadDragger
          fileList={fileList}
          onChange={setFileList}
          accept='.doc,.docx,.odt,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          text='ลากไฟล์ Word มาวางที่นี่ หรือคลิกเพื่อเลือกไฟล์'
          hint='รองรับ .doc, .docx, .odt'
        />

        {fileList.length > 0 && (
          <PreviewList fileList={fileList} onReorder={setFileList} onDelete={handleDelete} />
        )}
      </div>
      <ConvertOptions
        fileListLength={fileList.length}
        merge={merge}
        setMerge={setMerge}
        onConvert={handleUpload}
        loading={loading}
        downloadUrl={downloadUrl}
      />
    </div>
  );
}
