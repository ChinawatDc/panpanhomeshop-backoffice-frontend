'use client';
import { Button, Checkbox, Radio, Select, Typography } from 'antd';

const { Title } = Typography;

export default function ConvertOptions({
  fileListLength,
  orientation,
  setOrientation,
  paperSize,
  setPaperSize,
  margin,
  setMargin,
  merge,
  setMerge,
  onConvert,
  loading,
  downloadUrl,
}: any) {
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
        <Title level={4}>ตัวเลือกการแปลงรูปภาพเป็น PDF</Title>

        <div style={{ marginBottom: 16 }}>
          <div style={{ marginBottom: 8 }}>การวางแนวกระดาษ:</div>
          <Radio.Group value={orientation} onChange={(e) => setOrientation(e.target.value)}>
            <Radio.Button value='portrait'>แนวตั้ง</Radio.Button>
            <Radio.Button value='landscape'>แนวนอน</Radio.Button>
          </Radio.Group>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ marginBottom: 8 }}>ขนาดกระดาษ:</div>
          <Select
            value={paperSize}
            onChange={setPaperSize}
            style={{ width: '100%' }}
            options={[
              { value: 'A4', label: 'A4 (297x210 มม.)' },
              { value: 'A3', label: 'A3 (420x297 มม.)' },
              { value: 'Letter', label: 'Letter (216x279 มม.)' },
            ]}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ marginBottom: 8 }}>ขอบ:</div>
          <Radio.Group value={margin} onChange={(e) => setMargin(e.target.value)}>
            <Radio.Button value='none'>ไม่มีขอบ</Radio.Button>
            <Radio.Button value='small'>เล็ก</Radio.Button>
            <Radio.Button value='large'>ใหญ่</Radio.Button>
          </Radio.Group>
        </div>

        <Checkbox
          checked={merge}
          onChange={(e) => setMerge(e.target.checked)}
          style={{ marginBottom: 16 }}
        >
          รวมรูปภาพทั้งหมดไว้ใน PDF ไฟล์เดียว
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
          <div style={{ fontSize: 14 }}>กรุณาเพิ่มไฟล์เพื่อเปิดใช้งานตัวเลือกต่างๆ</div>
        </div>
      )}
    </div>
  );
}
