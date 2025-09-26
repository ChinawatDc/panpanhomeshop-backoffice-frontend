import { AuthItem, MenuItem } from '@/types/auth';

export const shopItems: MenuItem[] = [
  { key: 'home', name: 'หน้าแรก', path: '/shop' },
  { key: 'products', name: 'สินค้า', path: '/shop/products' },
  { key: 'cart', name: 'ตะกร้า', path: '/shop/cart' },
];

export const authItems: AuthItem[] = [
  { key: 'login', name: 'เข้าสู่ระบบ', path: '/auth/login', type: 'text' },
  { key: 'register', name: 'สมัครสมาชิก', path: '/auth/register', type: 'primary' },
];

export const adminItems: MenuItem[] = [
  { key: 'admin', name: 'แดชบอร์ด', path: '/admin' },
  { key: 'users', name: 'จัดการ User', path: '/admin/users' },
  { key: 'roles', name: 'จัดการ Role', path: '/admin/roles' },
  { key: 'permissions', name: 'จัดการ Permissions', path: '/admin/permissions' },
  { key: 'customers', name: 'จัดการ Customers', path: '/admin/customers' },
  { key: 'products', name: 'จัดการ Products', path: '/admin/products' },
  { key: 'orders', name: 'จัดการ Orders', path: '/admin/orders' },
  {
    key: 'settings',
    name: '⚙️ Settings',
    path: '/admin/settings',
    children: [
      { key: 'bot', name: '🤖 Bot', path: '/admin/settings/bot' },
      { key: 'master', name: '📂 Master', path: '/admin/settings/master' },
    ],
  },
];

export const docItems: MenuItem[] = [
  { key: 'home', name: 'หน้าแรก', path: '/documents' },
  {
    key: 'organize',
    name: 'จัดระเบียบ PDF',
    path: '/documents/merge',
    children: [
      { key: 'merge', name: 'รวม PDF', path: '/documents/merge' },
      { key: 'split', name: 'แยก PDF', path: '/documents/split' },
      { key: 'delete-pages', name: 'ลบหน้าออก', path: '/documents/delete-pages' },
      { key: 'reorder', name: 'จัดเรียง PDF', path: '/documents/reorder' },
      { key: 'scan', name: 'สแกนเป็น PDF', path: '/documents/scan' },
    ],
  },
  {
    key: 'optimize',
    name: 'เพิ่มประสิทธิภาพ PDF',
    path: '/documents/compress',
    children: [
      { key: 'compress', name: 'บีบอัด PDF', path: '/documents/compress' },
      { key: 'repair', name: 'ซ่อม PDF', path: '/documents/repair' },
      { key: 'ocr', name: 'OCR PDF', path: '/documents/ocr' },
    ],
  },
  {
    key: 'to-pdf',
    name: 'แปลงเป็น PDF',
    path: '/documents/jpg-to-pdf',
    children: [
      { key: 'jpg-to-pdf', name: 'JPG เป็น PDF', path: '/documents/jpg-to-pdf' },
      { key: 'word-to-pdf', name: 'WORD เป็น PDF', path: '/documents/word-to-pdf' },
      { key: 'ppt-to-pdf', name: 'POWERPOINT เป็น PDF', path: '/documents/ppt-to-pdf' },
      { key: 'excel-to-pdf', name: 'EXCEL เป็น PDF', path: '/documents/excel-to-pdf' },
      { key: 'html-to-pdf', name: 'HTML เป็น PDF', path: '/documents/html-to-pdf' },
    ],
  },
  {
    key: 'from-pdf',
    name: 'แปลงจาก PDF',
    path: '/documents/pdf-to-jpg',
    children: [
      { key: 'pdf-to-jpg', name: 'PDF เป็น JPG', path: '/documents/pdf-to-jpg' },
      { key: 'pdf-to-word', name: 'PDF เป็น WORD', path: '/documents/pdf-to-word' },
      { key: 'pdf-to-ppt', name: 'PDF เป็น POWERPOINT', path: '/documents/pdf-to-ppt' },
      { key: 'pdf-to-excel', name: 'PDF เป็น EXCEL', path: '/documents/pdf-to-excel' },
      { key: 'pdf-to-pdfa', name: 'PDF เป็น PDF/A', path: '/documents/pdf-to-pdfa' },
    ],
  },
  {
    key: 'edit',
    name: 'แก้ไข PDF',
    path: '/documents/rotate',
    children: [
      { key: 'rotate', name: 'หมุน PDF', path: '/documents/rotate' },
      { key: 'add-pages', name: 'ใส่หมายเลขหน้า', path: '/documents/add-pages' },
      { key: 'watermark', name: 'ใส่ลายน้ำ', path: '/documents/watermark' },
      { key: 'crop', name: 'ครอบตัด PDF', path: '/documents/crop' },
      { key: 'edit', name: 'แก้ไข PDF', path: '/documents/edit' },
    ],
  },
  {
    key: 'security',
    name: 'ความปลอดภัยของ PDF',
    path: '/documents/unlock',
    children: [
      { key: 'unlock', name: 'ปลดล็อค PDF', path: '/documents/unlock' },
      { key: 'protect', name: 'ป้องกัน PDF', path: '/documents/protect' },
      { key: 'sign', name: 'เซ็น PDF', path: '/documents/sign' },
      { key: 'redact', name: 'ปิดบังข้อความ PDF', path: '/documents/redact' },
      { key: 'compare', name: 'เปรียบเทียบ PDF', path: '/documents/compare' },
    ],
  },
];

// ⚖️ Law System
export const lawItems: MenuItem[] = [
  { key: 'law-home', name: '⚖️ Law System', path: '/law' },
  { key: 'cases', name: '📂 Case Management', path: '/law/cases' },
  { key: 'contracts', name: '📜 Contract Management', path: '/law/contracts' },
  { key: 'consultation', name: '👨‍⚖️ Consultation Booking', path: '/law/consultation' },
  { key: 'knowledge', name: '🗂️ Legal Knowledge Base', path: '/law/knowledge' },
  { key: 'workflow', name: '📨 Legal Workflow', path: '/law/workflow' },
  { key: 'compliance', name: '📊 Risk & Compliance', path: '/law/compliance' },
];

// 📱 CRM & Member
export const crmItems: MenuItem[] = [
  { key: 'crm-home', name: '📱 CRM & Member System', path: '/crm' },
  { key: 'members', name: 'จัดการสมาชิก', path: '/crm/members' },
  { key: 'loyalty', name: '🎁 Loyalty Program', path: '/crm/loyalty' },
  { key: 'marketing', name: '📩 Marketing Automation', path: '/crm/marketing' },
];

// 🏢 HR
export const hrItems: MenuItem[] = [
  { key: 'hr-home', name: '🏢 HR & Employee', path: '/hr' },
  { key: 'employees', name: '👥 จัดการพนักงาน', path: '/hr/employees' },
  { key: 'attendance', name: '🕒 เวลาทำงาน/การลา', path: '/hr/attendance' },
  { key: 'payroll', name: '💰 Payroll', path: '/hr/payroll' },
  { key: 'review', name: '📈 Performance Review', path: '/hr/review' },
];

// 💰 Finance
export const financeItems: MenuItem[] = [
  { key: 'finance-home', name: '💰 Finance & Accounting', path: '/finance' },
  { key: 'transactions', name: '📑 รายรับ-รายจ่าย', path: '/finance/transactions' },
  { key: 'reports', name: '📊 รายงานกำไรขาดทุน', path: '/finance/reports' },
  { key: 'invoices', name: '🧾 ใบแจ้งหนี้/ใบเสร็จ', path: '/finance/invoices' },
];

// 🔒 Security
export const securityItems: MenuItem[] = [
  { key: 'security-home', name: '🔒 Security & Compliance', path: '/security' },
  { key: 'iam', name: '🔑 Identity & Access (IAM/SSO/MFA)', path: '/security/iam' },
  { key: 'privacy', name: '🛡️ Privacy & Consent (PDPA/GDPR)', path: '/security/privacy' },
  { key: 'dpo-tools', name: '📋 DPO Tools', path: '/security/dpo-tools' },
];

// 🌐 Portal
export const portalItems: MenuItem[] = [
  { key: 'portal-home', name: '🌐 Portal & CMS', path: '/portal' },
  { key: 'website', name: '🖥️ Public Website', path: '/portal/website' },
  { key: 'blog', name: '📰 Blog / News', path: '/portal/blog' },
  { key: 'kb', name: '📚 Knowledge Base', path: '/portal/kb' },
  { key: 'lang', name: '🌍 Multi-language Support', path: '/portal/lang' },
];
