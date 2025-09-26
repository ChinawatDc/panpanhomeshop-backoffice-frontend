'use client';

import { getPublicIp } from '@/libs/getPublicIp';
import { setUser } from '@/redux/slices/authSlice';
import { getMeService, loginService, registerService } from '@/services/auth';
import { LoginFormValues } from '@/types/auth';
import { Button, Card, Divider, Space, Typography, notification } from 'antd';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import AuthFields from './AuthFields';
import SocialLoginButtons from './SocialLoginButtons';

const { Title } = Typography;

type Props = {
  type: 'login' | 'register';
};

export default function AuthForm({ type }: Props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ mode: 'onChange' });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: LoginFormValues) => {
    try {
      setLoading(true);
      const publicIp = await getPublicIp();
      const device_id = publicIp ?? navigator.userAgent ?? 'unknown-device';

      if (type === 'login') {
        const res = await loginService({
          email: values.identifier,
          password: values.password,
          device_id,
        });
        if (!res?.access_token) throw new Error('เข้าสู่ระบบไม่สำเร็จ');

        notification.success({ message: 'เข้าสู่ระบบสำเร็จ' });
        const me = await getMeService();
        dispatch(setUser(me));
        router.push('/');
      } else {
        await registerService({
          email: values.identifier,
          user_name: values.username || '',
          first_name: values.first_name || '',
          last_name: values.last_name || '',
          password: values.password,
          device_id,
        });
        notification.success({ message: 'สมัครสมาชิกสำเร็จ' });
        const me = await getMeService();
        dispatch(setUser(me));
        router.push('/');
      }
    } catch (err: unknown) {
      const error = err as AxiosError<{ error?: string }>;
      notification.error({ message: error.response?.data?.error || 'เกิดข้อผิดพลาด' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}
    >
      <Card style={{ width: 400, padding: 20 }}>
        <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
          {type === 'login' ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}
        </Title>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <AuthFields type={type} control={control} errors={errors} />
          <Button type='primary' htmlType='submit' block loading={loading} style={{ marginTop: 8 }}>
            {type === 'login' ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}
          </Button>
        </form>

        <Divider />

        {/* Links */}
        <Space style={{ width: '100%', justifyContent: 'space-between', marginTop: 8 }}>
          <Link href='/'>
            <Button>กลับหน้าแรก</Button>
          </Link>
          {type === 'login' ? (
            <Link href='/auth/register'>
              <Button type='link'>ยังไม่มีบัญชี? สมัครสมาชิก</Button>
            </Link>
          ) : (
            <Link href='/auth/login'>
              <Button type='link'>มีบัญชีแล้ว? เข้าสู่ระบบ</Button>
            </Link>
          )}
        </Space>

        {/* Social Login */}
        <SocialLoginButtons />
      </Card>
    </div>
  );
}
