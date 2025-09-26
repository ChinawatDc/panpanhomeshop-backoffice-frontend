// next-auth.d.ts
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    idToken?: string;
    user?: DefaultSession['user'];
  }

  interface JWT {
    accessToken?: string;
    idToken?: string;
  }
}
