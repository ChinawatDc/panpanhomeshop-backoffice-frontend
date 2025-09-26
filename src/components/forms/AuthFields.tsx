'use client';

import { LoginFormValues } from '@/types/auth';
import { Input, Typography } from 'antd';
import { Control, Controller, FieldErrors } from 'react-hook-form';

const { Text } = Typography;

type Props = {
  type: 'login' | 'register';
  control: Control<LoginFormValues>;
  errors: FieldErrors<LoginFormValues>;
};

export default function AuthFields({ type, control, errors }: Props) {
  return (
    <>
      {type === 'register' && (
        <>
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
    </>
  );
}
