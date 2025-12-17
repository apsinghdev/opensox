import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { serverTrpc } from "../trpc-server";
import { createAuthenticatedClient } from "../trpc-server";

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      authorization: {
        params: { scope: "read:user user:email" },
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
  cookies: {
    sessionToken: {
      name: `${process.env.NODE_ENV === "production" ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  callbacks: {
    async signIn({ user, profile, account }) {
      try {
        await serverTrpc.auth.googleAuth.mutate({
          email: user.email!,
          firstName: user.name ?? (profile as any)?.name,
          authMethod: account?.provider ?? "google",
          providerAccountId: account?.providerAccountId,
          access_token: account?.access_token,
          refresh_token: account?.refresh_token,
          id_token: account?.id_token,
          expires_at: account?.expires_at,
          token_type: account?.token_type,
          scope: account?.scope,
        });

        return true;
      } catch (error) {
        console.error("Sign-in error:", error);
        return false;
      }
    },

    async session({ session, token }) {
      const isPaidUser = (token.isPaidUser as boolean) || false;
      const subscription = (token.subscription as any) || null;

      return {
        ...session,
        accessToken: token.jwtToken as string,
        expires: session.expires,
        user: {
          ...session.user,
          isPaidUser,
          subscription,
        },
      };
    },

    async jwt({ token, account, user, trigger }) {
      if (account && user) {
        try {
          const data = await serverTrpc.auth.generateJWT.mutate({
            email: user.email!,
          });

          token.jwtToken = data.token;
        } catch (error) {
          console.error("JWT token error:", error);
        }
      }

      if (token.jwtToken) {
        const shouldRefresh =
          trigger === "update" ||
          trigger === "signIn" ||
          !token.isPaidUser ||
          token.isPaidUser === undefined;

        if (shouldRefresh) {
          try {
            const tempSession = {
              accessToken: token.jwtToken as string,
              user: { email: user?.email || token.email },
            } as any;

            const trpc = createAuthenticatedClient(tempSession);
            const sessionData = await (trpc.auth as any).getSession.query();

            if (sessionData?.user) {
              token.isPaidUser = sessionData.user.isPaidUser || false;
              token.subscription = sessionData.user.subscription || null;
            }
          } catch (error) {
            console.error("Session refresh error:", error);
          }
        }
      }

      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
};
