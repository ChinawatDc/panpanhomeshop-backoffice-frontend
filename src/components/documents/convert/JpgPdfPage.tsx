'use client';
import { convertJpgToPdf } from '@/services/documents/convert.service';
import { message } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { useState } from 'react';
import UploadDragger from '../UploadDragger';
import ConvertOptions from './jpg-to-pdf/ConvertOptions';
import ImagePreviewList from './jpg-to-pdf/ImagePreviewList';

export default function JpgPdfPage() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [rotations, setRotations] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [paperSize, setPaperSize] = useState('A4');
  const [margin, setMargin] = useState<'none' | 'small' | 'large'>('none');
  const [merge, setMerge] = useState(true);

  const handleUpload = async () => {
    if (fileList.length === 0) {
      message.error('กรุณาเลือกไฟล์ JPG อย่างน้อย 1 ไฟล์');
      return;
    }
    setLoading(true);
    setDownloadUrl(null);
    try {
      const files = fileList.map((f) => f.originFileObj as File).filter(Boolean);
      const pdfBlob = await convertJpgToPdf(files, {
        orientation,
        paperSize,
        margin,
        merge,
      });
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
    setRotations((prev) => {
      const copy = { ...prev };
      delete copy[uid];
      return copy;
    });
  };

  const handleRotate = (uid: string) => {
    setRotations((prev) => ({
      ...prev,
      [uid]: ((prev[uid] || 0) + 90) % 360,
    }));
  };

  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
      <div style={{ flex: 1 }}>
        <UploadDragger
          fileList={fileList}
          onChange={setFileList}
          accept='image/jpeg,image/png'
          text='ลากไฟล์รูปภาพมาวางที่นี่ หรือคลิกเพื่อเลือกไฟล์'
          hint='รองรับ JPG, PNG'
        />

        {fileList.length > 0 && (
          <ImagePreviewList
            fileList={fileList}
            rotations={rotations}
            onReorder={setFileList}
            onDelete={handleDelete}
            onRotate={handleRotate}
          />
        )}
      </div>
      <ConvertOptions
        fileListLength={fileList.length}
        orientation={orientation}
        setOrientation={setOrientation}
        paperSize={paperSize}
        setPaperSize={setPaperSize}
        margin={margin}
        setMargin={setMargin}
        merge={merge}
        setMerge={setMerge}
        onConvert={handleUpload}
        loading={loading}
        downloadUrl={downloadUrl}
      />
    </div>
  );
}
