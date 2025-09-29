'use client';
import { DndContext, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import type { UploadFile } from 'antd/es/upload/interface';
import { useState } from 'react';

import SortableWord from './SortableWord';
import WordPreviewModal from './WordPreviewModal';

export default function PreviewList({
  fileList,
  onReorder,
  onDelete,
  onRotate,
}: {
  fileList: UploadFile[];
  onReorder: (newList: UploadFile[]) => void;
  onDelete: (uid: string) => void;
  onRotate?: (uid: string) => void;
}) {
  const sensors = useSensors(useSensor(PointerSensor));
  const [previewFile, setPreviewFile] = useState<UploadFile | null>(null);

  return (
    <>
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
        <SortableContext
          items={fileList.map((f) => f.uid)}
          strategy={horizontalListSortingStrategy}
        >
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {fileList.map((file) => (
              <SortableWord
                key={file.uid}
                file={file}
                onDelete={onDelete}
                onRotate={onRotate}
                onPreview={setPreviewFile}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* Modal Preview */}
      <WordPreviewModal file={previewFile} onClose={() => setPreviewFile(null)} />
    </>
  );
}
