import { apiAuth } from '../api-axios.config';

export async function keyCloakLoginService(token: string) {
  const res = await apiAuth.post(
    'auth/keycloak-login',
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
}
