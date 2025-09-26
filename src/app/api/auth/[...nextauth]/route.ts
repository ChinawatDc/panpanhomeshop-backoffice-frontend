import NextAuth from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';

const handler = NextAuth({
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET || '',
      issuer: `${process.env.KEYCLOAK_URL}${process.env.KEYCLOAK_ISSUER}`,
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, account }) {
      if (account?.id_token) {
        token.idToken = account.id_token; // เก็บ ID Token
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).idToken = token.idToken; // ส่งต่อไปที่ session
      return session;
    },
  },
  events: {
    async signOut({ token }) {
      if (token?.idToken) {
        console.log('🚪 Logging out from Keycloak...');
        await fetch(
          `${process.env.KEYCLOAK_URL}${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/logout`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              client_id: process.env.KEYCLOAK_CLIENT_ID!,
              client_secret: process.env.KEYCLOAK_CLIENT_SECRET || '',
              id_token_hint: token.idToken as string,
            }),
          },
        );
      }
    },
  },
});

export { handler as GET, handler as POST };
