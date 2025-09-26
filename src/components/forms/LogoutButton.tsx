import { removePairTokens } from '@/libs/token';
import { clearUser } from '@/redux/slices/authSlice';
import { LogoutOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { signOut } from 'next-auth/react';
import { useDispatch } from 'react-redux';

export default function LogoutButton() {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      removePairTokens();
      dispatch(clearUser());
      console.log('🚪 Trigger signOut...');
      await signOut({
        callbackUrl: '/auth/login',
        redirect: true,
      });
      message.success('ออกจากระบบสำเร็จ');
    } catch (err) {
      console.error('❌ signOut failed:', err);
      message.error('ออกจากระบบไม่สำเร็จ');
    }
  };

  return (
    <Button block danger icon={<LogoutOutlined />} onClick={handleLogout}>
      ออกจากระบบ
    </Button>
  );
}
