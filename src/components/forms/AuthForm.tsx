'use client';

import { getPublicIp } from '@/libs/getPublicIp';
import { setUser } from '@/redux/slices/authSlice';
import { getMeService, loginService, registerService } from '@/services/auth';
import { LoginFormValues } from '@/types/auth';
import { Button, Card, Divider, Input, Space, Typography, notification } from 'antd';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

const { Title, Text } = Typography;

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
  } = useForm<LoginFormValues>({
    mode: 'onChange',
  });

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
        if (!res?.access_token) {
          throw new Error('เข้าสู่ระบบไม่สำเร็จ');
        }

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
      notification.error({
        message: error.response?.data?.error || 'เกิดข้อผิดพลาด',
      });
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
      }}
    >
      <Card style={{ width: 400, padding: 20 }}>
        {/* Title */}
        <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
          {type === 'login' ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}
        </Title>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {type === 'register' && (
            <>
              {/* Username */}
              <div style={{ marginBottom: 16 }}>
                <Text strong>ชื่อผู้ใช้</Text>
                <Controller
                  name='username'
                  control={control}
                  rules={{ required: 'กรุณากรอกชื่อผู้ใช้' }}
                  render={({ field }) => <Input {...field} placeholder='ชื่อผู้ใช้' />}
                />
                {errors.username && <Text type='danger'>{errors.username.message}</Text>}
              </div>

              {/* First Name */}
              <div style={{ marginBottom: 16 }}>
                <Text strong>ชื่อจริง</Text>
                <Controller
                  name='first_name'
                  control={control}
                  rules={{ required: 'กรุณากรอกชื่อจริง' }}
                  render={({ field }) => <Input {...field} placeholder='ชื่อจริง' />}
                />
                {errors.first_name && <Text type='danger'>{errors.first_name.message}</Text>}
              </div>

              {/* Last Name */}
              <div style={{ marginBottom: 16 }}>
                <Text strong>นามสกุล</Text>
                <Controller
                  name='last_name'
                  control={control}
                  rules={{ required: 'กรุณากรอกนามสกุล' }}
                  render={({ field }) => <Input {...field} placeholder='นามสกุล' />}
                />
                {errors.last_name && <Text type='danger'>{errors.last_name.message}</Text>}
              </div>
            </>
          )}

          {/* Identifier */}
          <div style={{ marginBottom: 16 }}>
            <Text strong>อีเมลหรือชื่อผู้ใช้</Text>
            <Controller
              name='identifier'
              control={control}
              rules={{
                required: 'กรุณากรอกอีเมลหรือชื่อผู้ใช้',
                validate: (value) => {
                  const emailRegex = /^\S+@\S+$/i;
                  if (emailRegex.test(value) || value.length > 0) return true;
                  return 'อีเมลหรือชื่อผู้ใช้ไม่ถูกต้อง';
                },
              }}
              render={({ field }) => <Input {...field} placeholder='อีเมลหรือชื่อผู้ใช้' />}
            />
            {errors.identifier && <Text type='danger'>{errors.identifier.message}</Text>}
          </div>

          {/* Password */}
          <div style={{ marginBottom: 16 }}>
            <Text strong>รหัสผ่าน</Text>
            <Controller
              name='password'
              control={control}
              rules={{ required: 'กรุณากรอกรหัสผ่าน' }}
              render={({ field }) => <Input.Password {...field} placeholder='รหัสผ่าน' />}
            />
            {errors.password && <Text type='danger'>{errors.password.message}</Text>}
          </div>

          {/* Submit */}
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
      </Card>
    </div>
  );
}
