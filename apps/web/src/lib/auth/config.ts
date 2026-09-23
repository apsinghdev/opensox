import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { serverTrpc } from "../trpc-server";

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
    CredentialsProvider({
      id: "credentials",
      name: "Email",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const result = await serverTrpc.auth.reviewLogin.mutate({
            email: credentials.email,
            password: credentials.password,
          });

          return {
            id: result.user.id,
            email: result.user.email,
            name: result.user.firstName,
            createdAt: result.user.createdAt,
          };
        } catch (error) {
          console.error("Credentials sign-in error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, profile, account }) {
      if (account?.provider === "credentials") {
        return true;
      }

      try {
        const authResult = await serverTrpc.auth.googleAuth.mutate({
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

        // Store createdAt in user object for JWT callback
        if (authResult?.user?.createdAt) {
          (user as any).createdAt = authResult.user.createdAt;
        }

        return true;
      } catch (error) {
        console.error("Sign-in error:", error);
        return false;
      }
    },

    async session({ session, token }) {
      // Add createdAt from token to session
      if (token.createdAt && session.user) {
        session.user.createdAt = token.createdAt as string;
      }

      return {
        ...session,
        accessToken: token.jwtToken,
        expires: session.expires,
      };
    },

    async jwt({ token, account, user }) {
      if (account && user) {
        try {
          const data = await serverTrpc.auth.generateJWT.mutate({
            email: user.email!,
          });

          token.jwtToken = data.token;

          // Store createdAt in token if available
          if ((user as any).createdAt) {
            token.createdAt = new Date((user as any).createdAt).toISOString();
          }
        } catch (error) {
          console.error("JWT token error:", error);
        }
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
};
