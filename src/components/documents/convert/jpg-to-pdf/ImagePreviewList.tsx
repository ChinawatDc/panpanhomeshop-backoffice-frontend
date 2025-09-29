'use client';
import { DndContext, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import type { UploadFile } from 'antd/es/upload/interface';
import SortableImage from './SortableImage';

export default function ImagePreviewList({
  fileList,
  rotations,
  onReorder,
  onDelete,
  onRotate,
}: {
  fileList: UploadFile[];
  rotations: Record<string, number>;
  onReorder: (newList: UploadFile[]) => void;
  onDelete: (uid: string) => void;
  onRotate: (uid: string) => void;
}) {
  const sensors = useSensors(useSensor(PointerSensor));

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={({ active, over }) => {
        if (!over || active.id === over.id) return;
        const oldIndex = fileList.findIndex((f) => f.uid === active.id);
        const newIndex = fileList.findIndex((f) => f.uid === over.id);
        onReorder(arrayMove(fileList, oldIndex, newIndex));
      }}
    >
      <SortableContext items={fileList.map((f) => f.uid)} strategy={horizontalListSortingStrategy}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {fileList.map((file) => (
            <SortableImage
              key={file.uid}
              file={file}
              rotation={rotations[file.uid] || 0}
              onDelete={onDelete}
              onRotate={onRotate}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
