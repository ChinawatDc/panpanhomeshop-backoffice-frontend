'use client';

import { keyCloakLoginService } from '@/services/auth/keycloak';
import {
  AppleOutlined,
  FacebookOutlined,
  GoogleOutlined,
  PhoneOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { Button, Divider, Space } from 'antd';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import LogoutButton from './LogoutButton';

export default function SocialLoginButtons() {
  const { data: session } = useSession();
  const [me, setMe] = useState<any>(null);

  useEffect(() => {
    if (session?.idToken) {
      keyCloakLoginService(session.idToken)
        .then((res) => {
          console.log('✅ Response from backend:', res);
          setMe(res);
        })
        .catch((err) => {
          console.error('❌ Keycloak login failed:', err);
        });
    }
  }, [session?.idToken]);

  console.log('🟢 Session from useSession:', session);

  return (
    <>
      <Divider>หรือเข้าสู่ระบบด้วย</Divider>
      <Space direction='vertical' style={{ width: '100%' }}>
        {!session ? (
          <>
            <Button block icon={<GoogleOutlined />} onClick={() => signIn('google')}>
              เข้าสู่ระบบด้วย Google
            </Button>

            <Button block icon={<FacebookOutlined />} onClick={() => signIn('facebook')}>
              เข้าสู่ระบบด้วย Facebook
            </Button>

            <Button block icon={<AppleOutlined />} onClick={() => signIn('apple')}>
              เข้าสู่ระบบด้วย Apple
            </Button>

            <Button
              block
              icon={<PhoneOutlined />}
              onClick={() => signIn('credentials', { callbackUrl: '/auth/phone' })}
            >
              เข้าสู่ระบบด้วยเบอร์โทรศัพท์
            </Button>

            <Button
              block
              type='default'
              icon={<UserSwitchOutlined />}
              onClick={() => signIn('keycloak')}
            >
              เข้าสู่ระบบด้วย Keycloak
            </Button>
          </>
        ) : (
          <LogoutButton />
        )}
      </Space>

      {me && (
        <pre style={{ marginTop: 16, fontSize: 12, background: '#f7f7f7', padding: 8 }}>
          {JSON.stringify(me, null, 2)}
        </pre>
      )}
    </>
  );
}
