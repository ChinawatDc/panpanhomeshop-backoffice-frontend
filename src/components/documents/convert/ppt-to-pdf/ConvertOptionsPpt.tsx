'use client';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Checkbox } from 'antd';

export default function ConvertOptionsPpt({
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
    <div style={{ width: 300, background: '#fff', border: '1px solid #eee', borderRadius: 8, padding: 20 }}>
      <h4>ตัวเลือกการแปลง PowerPoint เป็น PDF</h4>
      <Checkbox checked disabled style={{ marginBottom: 16 }}>
        รวมสไลด์ทั้งหมดเป็น PDF เดียว
      </Checkbox>

      <Button type="primary" block size="large" onClick={onConvert} loading={loading} disabled={disabled}>
        แปลงเป็น PDF
      </Button>

      {downloadUrl && (
        <div style={{ marginTop: 20, textAlign: 'center' }}>
          <a href={downloadUrl} download="converted.pdf">
            <Button type="default" icon={<DownloadOutlined />}>
              ดาวน์โหลด PDF
            </Button>
          </a>
        </div>
      )}
    </div>
  );
}
