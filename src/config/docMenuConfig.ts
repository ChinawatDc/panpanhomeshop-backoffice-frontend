import { DocMenuSection } from '@/types/documents/documents';

export const docSections: DocMenuSection[] = [
  {
    title: 'จัดระเบียบ PDF',
    items: [
      { key: 'merge', name: 'รวม PDF', path: '/documents/merge', icon: '📑' },
      { key: 'split', name: 'แยก PDF', path: '/documents/split', icon: '✂️' },
      { key: 'delete-pages', name: 'ลบหน้าออก', path: '/documents/delete-pages', icon: '❌' },
      { key: 'reorder', name: 'จัดเรียง PDF', path: '/documents/reorder', icon: '🔀' },
      { key: 'scan', name: 'สแกนเป็น PDF', path: '/documents/scan', icon: '📷' },
    ],
  },
  {
    title: 'เพิ่มประสิทธิภาพ PDF',
    items: [
      { key: 'compress', name: 'บีบอัด PDF', path: '/documents/compress', icon: '📉' },
      { key: 'repair', name: 'ซ่อม PDF', path: '/documents/repair', icon: '🛠️' },
      { key: 'ocr', name: 'OCR PDF', path: '/documents/ocr', icon: '🔎' },
    ],
  },
  {
    title: 'แปลงเป็น PDF',
    items: [
      { key: 'jpg-to-pdf', name: 'JPG เป็น PDF', path: '/documents/jpg-to-pdf', icon: '🖼️' },
      { key: 'word-to-pdf', name: 'WORD เป็น PDF', path: '/documents/word-to-pdf', icon: '📄' },
      { key: 'ppt-to-pdf', name: 'POWERPOINT เป็น PDF', path: '/documents/ppt-to-pdf', icon: '📊' },
      { key: 'excel-to-pdf', name: 'EXCEL เป็น PDF', path: '/documents/excel-to-pdf', icon: '📈' },
      { key: 'html-to-pdf', name: 'HTML เป็น PDF', path: '/documents/html-to-pdf', icon: '🌐' },
    ],
  },
  {
    title: 'แปลงจาก PDF',
    items: [
      { key: 'pdf-to-jpg', name: 'PDF เป็น JPG', path: '/documents/pdf-to-jpg', icon: '🖼️' },
      { key: 'pdf-to-word', name: 'PDF เป็น WORD', path: '/documents/pdf-to-word', icon: '📄' },
      { key: 'pdf-to-ppt', name: 'PDF เป็น POWERPOINT', path: '/documents/pdf-to-ppt', icon: '📊' },
      { key: 'pdf-to-excel', name: 'PDF เป็น EXCEL', path: '/documents/pdf-to-excel', icon: '📈' },
      { key: 'pdf-to-pdfa', name: 'PDF เป็น PDF/A', path: '/documents/pdf-to-pdfa', icon: '📘' },
    ],
  },
  {
    title: 'แก้ไข PDF',
    items: [
      { key: 'rotate', name: 'หมุน PDF', path: '/documents/rotate', icon: '🔄' },
      { key: 'add-pages', name: 'ใส่หมายเลขหน้า', path: '/documents/add-pages', icon: '🔢' },
      { key: 'watermark', name: 'ใส่ลายน้ำ', path: '/documents/watermark', icon: '💧' },
      { key: 'crop', name: 'ครอบตัด PDF', path: '/documents/crop', icon: '✂️' },
      { key: 'edit', name: 'แก้ไข PDF', path: '/documents/edit', icon: '✏️' },
    ],
  },
  {
    title: 'ความปลอดภัยของ PDF',
    items: [
      { key: 'unlock', name: 'ปลดล็อค PDF', path: '/documents/unlock', icon: '🔓' },
      { key: 'protect', name: 'ป้องกัน PDF', path: '/documents/protect', icon: '🔒' },
      { key: 'sign', name: 'เซ็น PDF', path: '/documents/sign', icon: '✍️' },
      { key: 'redact', name: 'ปิดบังข้อความ PDF', path: '/documents/redact', icon: '🕶️' },
      { key: 'compare', name: 'เปรียบเทียบ PDF', path: '/documents/compare', icon: '📑' },
    ],
  },
];
