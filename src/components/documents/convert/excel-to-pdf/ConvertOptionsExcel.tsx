'use client';
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export default function ConvertOptionsExcel({
  loading,
  disabled,
  onConvert,
  downloadUrl,
}: {
  loading: boolean;
  disabled: boolean;
  onConvert: () => void;
  downloadUrl: string | null;
}) {
  return (
    <div
      style={{
        width: 300,
        background: '#fff',
        border: '1px solid #eee',
        borderRadius: 8,
        padding: 20,
      }}
    >
      <h4>ตัวเลือกการแปลง Excel เป็น PDF</h4>
      <p style={{ fontSize: 13, color: '#666' }}>ทุกชีทในไฟล์ Excel จะถูก export อัตโนมัติ</p>

      <Button
        type='primary'
        block
        size='large'
        onClick={onConvert}
        loading={loading}
        disabled={disabled}
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
  );
}
