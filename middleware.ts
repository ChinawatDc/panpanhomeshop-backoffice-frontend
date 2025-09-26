import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: { signIn: '/auth/login' }, // หน้าให้ไปเมื่อยังไม่ล็อกอิน
});

export const config = {
  matcher: ['/admin/:path*', '/law/:path*', '/hr/:path*'], // แล้วแต่กำหนด
};
