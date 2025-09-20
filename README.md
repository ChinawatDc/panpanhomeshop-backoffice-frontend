# 🏠 PanPan Home

E-commerce Platform สำหรับขายสินค้า **Lifestyle / ของใช้ / ของแต่งบ้าน**  
ประกอบด้วย 2 ส่วนหลักคือ

- **Frontend** → [Next.js 14](https://nextjs.org/) (App Router, Tailwind CSS)
- **Backend** → [Golang](https://go.dev/) (REST API / gRPC + gRPC-Gateway)

---

## 🌐 Features

### ลูกค้า (Public)

- `/` → หน้าแรก (Landing / Home)
- `/products` → แสดงสินค้าทั้งหมด
- `/products/[id]` → รายละเอียดสินค้า
- `/cart` → ตะกร้าสินค้า
- `/checkout` → ชำระเงิน
- `/profile` → โปรไฟล์ลูกค้า (สั่งซื้อ/ที่อยู่/เปลี่ยนรหัสผ่าน)
- `/auth/login` → เข้าสู่ระบบ
- `/auth/register` → สมัครสมาชิก

### ผู้ดูแลระบบ (Admin Panel)

- `/admin` → Dashboard
- `/admin/products` → จัดการสินค้า
- `/admin/products/create` → เพิ่มสินค้าใหม่
- `/admin/products/[id]/edit` → แก้ไขสินค้า
- `/admin/users` → จัดการผู้ใช้
- `/admin/orders` → จัดการออเดอร์
- `/admin/customers` → ข้อมูลลูกค้า

---

## 📂 Project Structure

```plaintext
panpan-home/
├── frontend/               # Next.js 14 (App Router)
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── products/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── cart/page.tsx
│   │   ├── checkout/page.tsx
│   │   ├── profile/page.tsx
│   │   ├── auth/
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   └── admin/
│   │       ├── page.tsx
│   │       ├── products/page.tsx
│   │       ├── products/create/page.tsx
│   │       ├── products/[id]/edit/page.tsx
│   │       ├── users/page.tsx
│   │       ├── orders/page.tsx
│   │       └── customers/page.tsx
│   │
│   ├── components/         # UI components
│   ├── lib/                # helper / api client
│   ├── styles/             # global css / tailwind
│   ├── hooks/              # react hooks
│   ├── context/            # context provider
│   └── types/              # type/interface (ts)
│
├── backend/                # Golang service
│   ├── cmd/server/main.go  # entrypoint
│   ├── internal/
│   │   ├── api/            # handler, router
│   │   ├── models/         # GORM models
│   │   ├── repository/     # query DB
│   │   ├── service/        # business logic
│   │   └── config/         # env, database
│   └── pkg/                # utils, middleware, auth
│
├── docker-compose.yml
├── Makefile
└── README.md
```

---

## 🔗 API Endpoints (Backend)

```http
/api/v1/auth/login
/api/v1/auth/register

/api/v1/products        (GET, POST)
/api/v1/products/:id    (GET, PUT, DELETE)

/api/v1/users           (GET, POST)
/api/v1/users/:id       (GET, PUT, DELETE)

/api/v1/orders          (GET, POST)
/api/v1/orders/:id      (GET, PUT, DELETE)

/api/v1/customers       (GET, POST)
/api/v1/customers/:id   (GET, PUT, DELETE)
```

---

## 🚀 Getting Started

### 1. Clone Repo

```bash
git clone https://github.com/yourname/panpan-home.git
cd panpan-home
```

### 2. Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
# open http://localhost:3000
```

### 3. Backend (Go)

```bash
cd backend
go mod tidy
go run cmd/server/main.go
# open http://localhost:8080/api/healthz
```

---

## 🐳 Docker Compose

```bash
docker-compose up --build
```

---

## ✅ Summary

- **Frontend** = Next.js → หน้าเว็บลูกค้า + Admin Panel
- **Backend** = Golang → REST API / gRPC
- **Domain** = `panpanhome.com`

---

👨‍💻 Developed for **PanPan Home** E-commerce Platform
# panpanhomeshop-backoffice-frontend
