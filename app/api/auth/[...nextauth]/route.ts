import NextAuth, { type NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import type { OAuthConfig } from 'next-auth/providers';

// 飞书自定义 Provider（OAuth2）
const FeishuProvider = (): OAuthConfig<any> => ({
  id: 'feishu',
  name: 'Feishu',
  type: 'oauth',
  authorization: {
    url: 'https://open.feishu.cn/open-apis/authen/v1/index',
    params: { response_type: 'code' },
  },
  token: 'https://open.feishu.cn/open-apis/authen/v1/access_token',
  userinfo: 'https://open.feishu.cn/open-apis/authen/v1/user_info',
  clientId: process.env.FEISHU_CLIENT_ID,
  clientSecret: process.env.FEISHU_CLIENT_SECRET,
  checks: ['pkce', 'state'],
  profile: (profile: any) => {
    const data = profile?.data ?? profile;
    return {
      id: data?.user_id ?? data?.open_id ?? data?.union_id ?? 'feishu-user',
      name: data?.name ?? 'Feishu User',
      email: data?.email ?? null,
      image: data?.avatar?.avatar_72 ?? data?.avatar ?? null,
    };
  },
});

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    FeishuProvider(),
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = (user as any).id;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user && token.id) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

