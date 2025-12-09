declare module 'next-auth' {
  export interface DefaultSession {
    user?: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
  export interface Session extends DefaultSession {}
  export type NextAuthOptions = any;
  const nextAuth: any;
  export default nextAuth;
}

declare module 'next-auth/react' {
  export const SessionProvider: any;
  export const signIn: any;
  export const signOut: any;
  export const useSession: any;
}

declare module 'next-auth/providers' {
  export type OAuthConfig<T = any> = any;
}

declare module 'next-auth/providers/github' {
  import type { OAuthConfig } from 'next-auth/providers';
  export default function GithubProvider(options: {
    clientId: string;
    clientSecret: string;
  }): OAuthConfig;
}

