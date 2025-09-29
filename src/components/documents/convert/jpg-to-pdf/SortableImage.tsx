'use client';
import { Button, Card } from 'antd';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { UploadFile } from 'antd/es/upload/interface';

export default function SortableImage({
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

  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={{ ...style, position: 'relative' }} {...attributes} {...listeners}>
      <Card
        size='small'
        cover={
          <div style={{ position: 'relative', pointerEvents: 'none' }}>
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
                zIndex: 10,
                pointerEvents: 'auto',
              }}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                onRotate(file.uid);
              }}
            />

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
                zIndex: 10,
                pointerEvents: 'auto',
              }}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
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
