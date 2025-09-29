'use client';
import { convertExcelToPdf } from '@/services/documents/convert.service';
import { DndContext, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';

import { SortableContext, arrayMove, horizontalListSortingStrategy } from '@dnd-kit/sortable';

import { Upload, message } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { useState } from 'react';
import UploadDragger from '../UploadDragger';
import ConvertOptionsExcel from './excel-to-pdf/ConvertOptionsExcel';
import SortableExcel from './excel-to-pdf/PreviewListExcel';

const { Dragger } = Upload;

export default function ExcelPdfPage() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleConvert = async () => {
    if (fileList.length === 0) {
      message.error('กรุณาเลือกไฟล์ Excel อย่างน้อย 1 ไฟล์');
      return;
    }
    setLoading(true);
    setDownloadUrl(null);
    try {
      const files = fileList.map((f) => f.originFileObj as File).filter(Boolean);
      const pdfBlob = await convertExcelToPdf(files);
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

  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
      {/* ฝั่งซ้าย: Upload + Preview */}
      <div style={{ flex: 1 }}>
        <UploadDragger
          fileList={fileList}
          onChange={setFileList}
          accept='.xls,.xlsx'
          text='ลากไฟล์ Excel มาวางที่นี่ หรือคลิกเพื่อเลือกไฟล์'
          hint='รองรับ .xls, .xlsx'
        />

        {fileList.length > 0 && (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={({ active, over }) => {
              if (!over || active.id === over.id) return;
              const oldIndex = fileList.findIndex((f) => f.uid === active.id);
              const newIndex = fileList.findIndex((f) => f.uid === over.id);
              setFileList((prev) => arrayMove(prev, oldIndex, newIndex));
            }}
          >
            <SortableContext
              items={fileList.map((f) => f.uid)}
              strategy={horizontalListSortingStrategy}
            >
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {fileList.map((file) => (
                  <SortableExcel
                    key={file.uid}
                    file={file}
                    onDelete={(uid) => setFileList((prev) => prev.filter((f) => f.uid !== uid))}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      {/* ฝั่งขวา: Options */}
      <ConvertOptionsExcel
        loading={loading}
        disabled={fileList.length === 0}
        onConvert={handleConvert}
        downloadUrl={downloadUrl}
      />
    </div>
  );
}
