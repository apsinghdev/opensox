import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import type { AppRouter } from "../../../api/src/routers/_app";
import type { Session } from "next-auth";

/**
 * Server-side tRPC client for use in NextAuth callbacks and server components
 */
export const serverTrpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      transformer: superjson,
      url: `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/trpc`,
      headers() {
        return {};
      },
    }),
  ],
});

/**
 * Create a tRPC client with session authentication
 */
export function createAuthenticatedClient(session: Session) {
  return createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        transformer: superjson,
        url: `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/trpc`,
        headers() {
          const token = session.accessToken;
          if (token) {
            return {
              authorization: `Bearer ${token}`,
            };
          }
          return {};
        },
      }),
    ],
  });
}
