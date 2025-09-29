'use client';
import { UploadOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';

const { Dragger } = Upload;

type Props = {
  fileList: UploadFile[];
  onChange: (newList: UploadFile[]) => void;
  accept?: string;
  text?: string;
  hint?: string;
  multiple?: boolean;
};

export default function UploadDragger({
  fileList,
  onChange,
  accept = '*/*',
  text = 'ลากไฟล์มาวางที่นี่ หรือคลิกเพื่อเลือกไฟล์',
  hint,
  multiple = true,
}: Props) {
  return (
    <Dragger
      multiple={multiple}
      accept={accept}
      showUploadList={false}
      beforeUpload={() => false}
      fileList={fileList}
      onChange={({ fileList: newList }) => onChange(newList)}
      style={{ marginBottom: 24 }}
    >
      <p className='ant-upload-drag-icon'>
        <UploadOutlined />
      </p>
      <p className='ant-upload-text'>{text}</p>
      {hint && <p className='ant-upload-hint'>{hint}</p>}
    </Dragger>
  );
}
