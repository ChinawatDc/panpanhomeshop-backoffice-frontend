'use client';
import { Modal } from 'antd';
import { useEffect, useRef } from 'react';
import { renderAsync } from 'docx-preview';
import type { UploadFile } from 'antd/es/upload/interface';

export default function WordPreviewModal({
  file,
  onClose,
}: {
  file: UploadFile | null;
  onClose: () => void;
}) {
  const previewRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (file && previewRef.current) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        if (!e.target?.result) return;
        const buffer = e.target.result as ArrayBuffer;

        // เคลียร์ content เดิม
        previewRef.current!.innerHTML = '';

        // render docx
        await renderAsync(buffer, previewRef.current!, undefined, {
          inWrapper: true,
          ignoreWidth: true,
          ignoreHeight: true,
          className: 'docx',
        });
      };
      reader.readAsArrayBuffer(file.originFileObj as File);
    }
  }, [file]);

  return (
    <Modal
      open={!!file}
      title={file?.name}
      onCancel={onClose}
      footer={null}
      width='80%'
      style={{ top: 20 }}
      bodyStyle={{ maxHeight: '80vh', overflow: 'auto', background: '#fff' }}
    >
      <div ref={previewRef} style={{ padding: 16 }} />
    </Modal>
  );
}
