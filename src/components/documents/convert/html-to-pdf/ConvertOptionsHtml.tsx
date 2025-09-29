'use client';
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export default function ConvertOptionsHtml({
  disabled,
  loading,
  onConvert,
  downloadUrl,
}: {
  disabled: boolean;
  loading: boolean;
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
      <h4 style={{ marginBottom: 16 }}>ตัวเลือกการแปลง HTML เป็น PDF</h4>

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
