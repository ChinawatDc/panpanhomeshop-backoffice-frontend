'use client';
import { Button, Checkbox, Typography } from 'antd';

const { Title } = Typography;

export default function ConvertOptions({
  fileListLength,
  merge,
  setMerge,
  onConvert,
  loading,
  downloadUrl,
}: {
  fileListLength: number;
  merge: boolean;
  setMerge: (val: boolean) => void;
  onConvert: () => void;
  loading: boolean;
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
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ filter: fileListLength === 0 ? 'blur(3px)' : 'none' }}>
        <Title level={4}>ตั้งค่าแปลง Word เป็น PDF</Title>

        <Checkbox
          checked={merge}
          onChange={(e) => setMerge(e.target.checked)}
          style={{ marginBottom: 16 }}
        >
          รวมไฟล์ทั้งหมดเป็น PDF ไฟล์เดียว
        </Checkbox>

        <Button
          type='primary'
          block
          size='large'
          onClick={onConvert}
          loading={loading}
          disabled={fileListLength === 0}
        >
          แปลงเป็น PDF
        </Button>

        {downloadUrl && (
          <div style={{ marginTop: 20, textAlign: 'center' }}>
            <a href={downloadUrl} download='converted.pdf'>
              <Button type='default'>ดาวน์โหลด PDF</Button>
            </a>
          </div>
        )}
      </div>

      {fileListLength === 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255,255,255,0.7)',
            color: '#555',
            fontWeight: 500,
            fontSize: 16,
            pointerEvents: 'none',
          }}
        >
          <div style={{ marginBottom: 8 }}>ไม่ได้เลือกไฟล์ใด</div>
          <div style={{ fontSize: 14 }}>กรุณาเพิ่มไฟล์เพื่อเปิดใช้งานการแปลง</div>
        </div>
      )}
    </div>
  );
}
