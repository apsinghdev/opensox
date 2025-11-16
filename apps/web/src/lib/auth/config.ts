import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { serverTrpc } from "../trpc-server";

// Helper to safely get and trim env vars
// Also removes surrounding quotes if present (handles .env files with quoted values)
const getEnvVar = (key: string): string | undefined => {
  const value = process.env[key];
  if (!value) return undefined;
  const trimmed = value.trim();
  // Remove surrounding quotes if present
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed || undefined;
};

// Build providers array conditionally based on available env vars
const providers: NextAuthOptions["providers"] = [];

const googleClientId = getEnvVar("GOOGLE_CLIENT_ID");
const googleClientSecret = getEnvVar("GOOGLE_CLIENT_SECRET");

if (googleClientId && googleClientSecret) {
  providers.push(
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    })
  );
} else {
  console.warn(
    "Google OAuth not configured: GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be set"
  );
}

const githubClientId = getEnvVar("GITHUB_CLIENT_ID");
const githubClientSecret = getEnvVar("GITHUB_CLIENT_SECRET");

if (githubClientId && githubClientSecret) {
  providers.push(
    GithubProvider({
      clientId: githubClientId,
      clientSecret: githubClientSecret,
      authorization: {
        params: { scope: "read:user user:email" },
      },
    })
  );
} else {
  console.warn(
    "GitHub OAuth not configured: GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET must be set"
  );
}

if (providers.length === 0) {
  console.error(
    "No OAuth providers configured. Please set at least one provider's credentials in .env.local"
  );
}

export const authConfig: NextAuthOptions = {
  providers,
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
      } catch (error: any) {
        console.error("Sign-in error:", error);
        
        // Check if it's a connection error
        if (error?.cause?.code === "ECONNREFUSED" || error?.message?.includes("fetch failed")) {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
          console.error(
            `❌ Cannot connect to backend API at ${apiUrl}. ` +
            `Please make sure your API server is running. ` +
            `The sign-in will be denied until the API is available.`
          );
        }
        
        // Deny sign-in if API call fails (security: we need to register the user in the backend)
        return false;
      }
    },

    async session({ session, token }) {
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
