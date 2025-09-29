'use client';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Card, Tooltip } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';

export default function SortableWord({
  file,
  onDelete,
  onRotate,
  onPreview,
}: {
  file: UploadFile;
  onDelete: (uid: string) => void;
  onRotate?: (uid: string) => void;
  onPreview: (file: UploadFile) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: file.uid,
  });

  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, position: 'relative', width: 140 }}
      {...attributes}
      {...listeners}
    >
      <Card
        size='small'
        style={{ width: '100%', cursor: 'grab' }}
        cover={
          <div style={{ position: 'relative', padding: 8 }}>
            {/* Thumbnail */}
            <img
              src='/icon/word.png'
              alt='word file'
              style={{
                width: '100%',
                height: 150,
                objectFit: 'contain',
                border: '1px solid #eee',
                borderRadius: 4,
                background: '#fafafa',
              }}
            />

            {/* ปุ่ม Action ด้านบนขวา */}
            <div
              style={{
                position: 'absolute',
                top: 4,
                right: 4,
                display: 'flex',
                gap: 4, // ระยะห่างระหว่างปุ่ม
              }}
            >
              {/* ปุ่ม Preview */}
              <Tooltip title='ดูตัวอย่าง'>
                <Button
                  size='small'
                  shape='circle'
                  icon={<EyeOutlined />}
                  style={{ background: '#fff', border: '1px solid #ddd' }}
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    onPreview(file);
                  }}
                />
              </Tooltip>

              {/* ปุ่มลบ */}
              <Tooltip title='ลบ'>
                <Button
                  size='small'
                  shape='circle'
                  danger
                  icon={<DeleteOutlined />}
                  style={{ background: '#fff' }}
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(file.uid);
                  }}
                />
              </Tooltip>
            </div>
          </div>
        }
      >
        {/* ชื่อไฟล์ */}
        <Tooltip title={file.name}>
          <div
            style={{
              fontSize: 12,
              textAlign: 'center',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {file.name}
          </div>
        </Tooltip>
      </Card>
    </div>
  );
}
