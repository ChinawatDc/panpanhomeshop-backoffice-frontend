'use client';

import { convertJpgToPdf } from '@/services/documents/convert.service';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Card, Checkbox, message, Radio, Select, Typography, Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { useState } from 'react';

const { Title } = Typography;
const { Dragger } = Upload;

function SortableImage({
  file,
  rotation,
  onDelete,
  onRotate,
}: {
  file: UploadFile;
  rotation: number;
  onDelete: (uid: string) => void;
  onRotate: (uid: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: file.uid,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={{ ...style, position: 'relative' }} {...attributes} {...listeners}>
      <Card
        size='small'
        cover={
          <div style={{ position: 'relative' }}>
            <img
              src={URL.createObjectURL(file.originFileObj as File)}
              alt={file.name}
              style={{
                height: 150,
                objectFit: 'contain',
                padding: 8,
                width: '100%',
                transform: `rotate(${rotation}deg)`,
                transition: 'transform 0.3s',
              }}
            />
            {/* ปุ่มหมุน */}
            <Button
              size='small'
              shape='circle'
              icon={<span style={{ transform: 'rotate(90deg)' }}>↻</span>}
              style={{
                position: 'absolute',
                top: 4,
                right: 32,
                background: '#fff',
                border: '1px solid #ddd',
              }}
              onClick={(e) => {
                e.stopPropagation(); // 🚫 กันไม่ให้ลาก
                onRotate(file.uid);
              }}
            />
            {/* ปุ่มลบ */}
            <Button
              size='small'
              shape='circle'
              danger
              icon={<span>✕</span>}
              style={{
                position: 'absolute',
                top: 4,
                right: 4,
                background: '#fff',
              }}
              onClick={(e) => {
                e.stopPropagation(); // 🚫 กันไม่ให้ลาก
                onDelete(file.uid);
              }}
            />
          </div>
        }
        style={{ width: 140, cursor: 'grab' }}
      >
        <span
          style={{
            fontSize: 12,
            display: 'inline-block',
            maxWidth: 120,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          title={file.name}
        >
          {file.name}
        </span>
      </Card>
    </div>
  );
}

export default function JpgPdfPage() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [rotations, setRotations] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  // --- ตัวเลือก ---
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [paperSize, setPaperSize] = useState('A4');
  const [margin, setMargin] = useState<'none' | 'small' | 'large'>('none');
  const [merge, setMerge] = useState(true);

  const sensors = useSensors(useSensor(PointerSensor));

  // --- Upload ---
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

  // --- จัดการลบ ---
  const handleDelete = (uid: string) => {
    console.log('Delete', uid);
    setFileList((prev) => prev.filter((f) => f.uid !== uid));
    setRotations((prev) => {
      const copy = { ...prev };
      delete copy[uid];
      return copy;
    });
  };

  // --- จัดการหมุน ---
  const handleRotate = (uid: string) => {
    setRotations((prev) => ({
      ...prev,
      [uid]: ((prev[uid] || 0) + 90) % 360,
    }));
  };

  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
      {/* ฝั่งซ้าย */}
      <div style={{ flex: 1 }}>
        <Dragger
          multiple
          accept='image/jpeg,image/png'
          showUploadList={false}
          beforeUpload={() => false}
          fileList={fileList} // ✅ บังคับใช้ state fileList
          onChange={({ fileList: newList }) => {
            setFileList(newList); // ✅ sync state
          }}
          style={{ marginBottom: 24 }}
        >
          <p className='ant-upload-drag-icon'>
            <UploadOutlined />
          </p>
          <p className='ant-upload-text'>ลากไฟล์มาวางที่นี่ หรือคลิกเพื่อเลือกไฟล์</p>
          <p className='ant-upload-hint'>รองรับ JPG และ PNG</p>
        </Dragger>

        {/* Preview + Drag reorder */}
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
                  <SortableImage
                    key={file.uid}
                    file={file}
                    rotation={rotations[file.uid] || 0}
                    onDelete={handleDelete}
                    onRotate={handleRotate}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      {/* ฝั่งขวา (options) */}
      <div
        style={{
          width: 300,
          background: '#fff',
          border: '1px solid #eee',
          borderRadius: 8,
          padding: 20,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* ตัวเลือกจริง */}
        <div style={{ filter: fileList.length === 0 ? 'blur(3px)' : 'none' }}>
          <Title level={4}>ตัวเลือกการแปลงรูปภาพเป็น PDF</Title>

          <div style={{ marginBottom: 16 }}>
            <div style={{ marginBottom: 8 }}>การวางแนวกระดาษ:</div>
            <Radio.Group value={orientation} onChange={(e) => setOrientation(e.target.value)}>
              <Radio.Button value='portrait'>แนวตั้ง</Radio.Button>
              <Radio.Button value='landscape'>แนวนอน</Radio.Button>
            </Radio.Group>
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ marginBottom: 8 }}>ขนาดกระดาษ:</div>
            <Select
              value={paperSize}
              onChange={setPaperSize}
              style={{ width: '100%' }}
              options={[
                { value: 'A4', label: 'A4 (297x210 มม.)' },
                { value: 'A3', label: 'A3 (420x297 มม.)' },
                { value: 'Letter', label: 'Letter (216x279 มม.)' },
              ]}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ marginBottom: 8 }}>ขอบ:</div>
            <Radio.Group value={margin} onChange={(e) => setMargin(e.target.value)}>
              <Radio.Button value='none'>ไม่มีขอบ</Radio.Button>
              <Radio.Button value='small'>เล็ก</Radio.Button>
              <Radio.Button value='large'>ใหญ่</Radio.Button>
            </Radio.Group>
          </div>

          <Checkbox
            checked={merge}
            onChange={(e) => setMerge(e.target.checked)}
            style={{ marginBottom: 16 }}
          >
            รวมรูปภาพทั้งหมดไว้ใน PDF ไฟล์เดียว
          </Checkbox>

          <Button
            type='primary'
            block
            size='large'
            onClick={handleUpload}
            loading={loading}
            disabled={fileList.length === 0}
          >
            แปลงเป็น PDF
          </Button>

          {downloadUrl && (
            <div style={{ marginTop: 20, textAlign: 'center' }}>
              <a href={downloadUrl} download='converted.pdf'>
                <Button type='default' icon={<DownloadOutlined />}>
                  ดาวน์โหลด PDF
                </Button>
              </a>
            </div>
          )}
        </div>

        {/* Overlay เบลอ + ข้อความ */}
        {fileList.length === 0 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255,255,255,0.7)',
              color: '#555',
              fontWeight: 500,
              fontSize: 16,
              pointerEvents: 'none',
            }}
          >
            <div style={{ marginBottom: 8 }}>ไม่ได้เลือกไฟล์ใด</div>
            <div style={{ fontSize: 14 }}>กรุณาเพิ่มไฟล์เพื่อเปิดใช้งานตัวเลือกต่างๆ</div>
          </div>
        )}
      </div>
    </div>
  );
}
