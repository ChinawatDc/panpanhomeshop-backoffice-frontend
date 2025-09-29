'use client';
import { DeleteOutlined } from '@ant-design/icons';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Card, Tooltip } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';

function SortableExcel({ file, onDelete }: { file: UploadFile; onDelete: (uid: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: file.uid,
  });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={{ ...style, width: 140 }} {...attributes} {...listeners}>
      <Card
        size='small'
        style={{ cursor: 'grab' }}
        cover={
          <div style={{ position: 'relative', padding: 8 }}>
            <img
              src='/icon/excel.png' // ใส่ไอคอน Excel ใน public/icon/
              alt='excel file'
              style={{
                width: '100%',
                height: 150,
                objectFit: 'contain',
                border: '1px solid #eee',
                borderRadius: 4,
                background: '#fafafa',
              }}
            />
            <Tooltip title='ลบ'>
              <Button
                size='small'
                shape='circle'
                danger
                icon={<DeleteOutlined />}
                style={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  background: '#fff',
                }}
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(file.uid);
                }}
              />
            </Tooltip>
          </div>
        }
      >
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

export default SortableExcel;
